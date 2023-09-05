import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "antd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { BASE_URL } from "redux/store/baseUrl";
import PagesContext from "context/PagesContext";

const ThemeCard = ({ id, title, prefix, imageUrl, themeUrl }) => {
  const history = useHistory();

  const { setPages } = useContext(PagesContext)

  const [isLoading, setIsLoading] = useState(false)

  const getTheme = async () => {
    localStorage.setItem("is_theme_selected", "true");
    localStorage.setItem("selected_theme_id", `${id}`);
    setIsLoading(true)
    try {
      let res = await axios.post(`${BASE_URL}/themes/get-string/${id}/eu`, {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        }
      )
      localStorage.setItem(
        "selected_theme_pages",
        JSON.stringify(res.data.pages.map((val) => val.name))
      );
      setPages(res.data.pages.map((val) => val.name))
      setIsLoading(false)

      await axios.get(`${BASE_URL}/users/is_select-theme`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        }
      )

      window.open(`${window.location.href.split(`${window.location.pathname}`)[0]}/app/components/createPage/home`, "_self")
      //history.push("/app/components/createPage/home");
    } catch (error) {
      console.log("error", error);
      setIsLoading(false)
    }
  };

  return (
    <Card>
      {title && <h4 className="mb-0">{title}</h4>}
      <div className={`${prefix ? "d-flex" : ""} ${title ? "mt-3" : ""}`}>
        {prefix ? <div className="mr-2">{prefix}</div> : null}
        <div className="img-fluid ">
          <img src={imageUrl} />
        </div>
        <div className="mb-3">
          <Button
            className="mr-2"
            onClick={() => {
              window.open(themeUrl, "_blank");
            }}
            type="primary"
            ghost
          >
            Preview
          </Button>

          <Button
            className="mr-2"
            onClick={getTheme}
            type="primary"
            loading={isLoading}
          >
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
};

ThemeCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  value: PropTypes.string,
  subtitle: PropTypes.string,
  status: PropTypes.number,
  prefix: PropTypes.element,
};

export default ThemeCard;
