import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Spin } from "antd";
import ThemeCard from "./ThemeCard";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { BASE_URL } from "redux/store/baseUrl";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { selectPackage } from "redux/actions/Auth";

const backgroundStyle = {
  backgroundImage: "url(/img/others/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
};

export const ThemesLayout = ({ selectPackage }) => {
  const [themes, setThemes] = useState([]);
  const [themelength, setThemeLength] = useState([])
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('price');

  const profile = useSelector((state) => state.auth.profile)
  const token = useSelector((state) => state.auth.token)
  let price = parseInt(query)


  useEffect(() => {
    let pri = profile?.package?.price
    if (price && price !== NaN) {
      return selectPackage(price, token)
    } else {
      if (pri != undefined) return selectPackage(pri, token)
    }
  }, [profile.package?.packageAttribute?.numberOfThemes.length])

  useEffect(() => {
    if (profile.package?.packageAttribute?.id) {
      return themeLimit()
    }
  }, [profile, themes])

  let themeLimit = () => {
    let data = profile.package.packageAttribute?.numberOfThemes
    {
      data.length &&
        data.forEach(element => {
          themes.forEach((value) => {
            if (element == value.title) {
              return themelength.push(value)
            }
          })
        });
    }
  }

  useEffect(() => {
    axios
      .post(
        `${BASE_URL}/themes/listing`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        }
      )
      .then((res) => {
        setThemes(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <Card style={backgroundStyle}>
      <div>
        <div className=" container my-4" overlap>
          <div className="container text-center">
            <h1 className="text-white ">Choose Your Theme </h1>
            <h3
              className="text-center mt-4 mb-4 mx-auto"
              type="flex"
              justify="center"
            >
              You can choose the appropriate theme for your field to match your
              business requirements.
            </h3>
          </div>
          <div className="container text-center">
            <Row gutter={16} type="flex" justify="center">
              {themelength?.length ? themelength?.map((elm, i) => (
                <Col key={i}>
                  <ThemeCard
                    title={elm.title}
                    themeUrl={`${BASE_URL}${elm.themeUrl}`}
                    imageUrl={`${BASE_URL}${elm.imageUrl}`}
                    id={elm.id}
                  />
                </Col>
              )) : ""}

            </Row>
          </div>
        </div>
      </div>
    </Card>
  );
};

// export default ThemesLayout;
export default connect(null, { selectPackage })(ThemesLayout)