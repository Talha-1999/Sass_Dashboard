// import React from 'react';
// import {
//   Layout, Row, Col, Card
// } from "antd";
// import PackageCard from './PackageCard';
// import { pricingData } from '../../../src/views/app-views/pages/pricing/pricingData';

// export const PackagesLayout = ({ navCollapsed, navType, location, direction }) => {

//   const annualStatisticData = [
//     {
//       title: 'Basic',
//       value: 'R.S 99',
//       status: 'R.S/MO',
//       subtitle: [`Cpanel`, `Landing page`]
//     },
//     {
//       title: 'Standard',
//       value: 'R.S 199',
//       status: 'R.S/MO',
//       subtitle: [`selle services or produces`, `this is custom item`]
//     },
//     {
//       title: 'Premium',
//       value: 'R.S 299',
//       status: 'R.S/MO',
//       subtitle: ['Email service', `this is custom item`]
//     }
//   ]

//   const backgroundStyle = {
//     backgroundImage: 'url(/img/others/img-17.jpg)',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   }

//   return (

//     <Card>
//       <div className="container">
//         <div className="text-center mb-4">
//         <h2 className="font-weight-semibold">Pick A Base Price Plan</h2>
//         <Row type="flex" justify="center">
// 						<Col sm={24} md={12} lg={8}>
// 							<p>
// 								Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission.
// 							</p>
// 						</Col>
// 					</Row>

//         <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', width: '70%', height: '200px', borderStyle: 'solid', borderColor: '#6180B8', borderRadius: "35px", justifyContent: 'center', alignItems: 'center', borderWidth: 'thin', marginTop: '100px', marginBottom: '50px' }}>
//           <h1>Price & Plan</h1>
//           <h3>Choose a payment Plan</h3>
//         </div>

//         <Col style={{ display: 'flex', flexDirection: 'column', width: '70%', borderStyle: 'solid', borderColor: '#6180B8', borderRadius: "35px", justifyContent: 'center', alignItems: 'center', borderWidth: 'thin', paddingTop: '20px' }}>
//           <Row gutter={16}>
//             <Col xs={24} sm={24} md={24} lg={18} xl={24}>
//               <Row gutter={16}>
//                 {
//                   annualStatisticData.map((elm, i) => (
//                     <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
//                       <PackageCard
//                         title={elm.title}
//                         value={elm.value}
//                         status={elm.status}
//                         subtitle={elm.subtitle}
//                       />
//                     </Col>
//                   ))
//                 }
//               </Row>
//             </Col>
//             <Col xs={24} sm={24} md={24} lg={6}>
//             </Col>
//           </Row>
//         </Col>

//         <Row gutter={16}>
//         </Row>
//       </div>
//       </div>
//     </Card>

//   )
// }

// export default PackagesLayout;
import React, { useEffect, useContext } from "react";
import { Row, Col, Card, Grid, Button, Badge, Layout } from "antd";
import { pricingData } from "./pricingData";
import utils from "utils";
import { BASE_URL } from "redux/store/baseUrl";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { paymentMethod, getPackage, selectPackage } from "redux/actions/Auth";
import PagesContext from "context/PagesContext";
import { AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";

const backgroundStyle = {
  backgroundImage: "url(/img/others/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
};

const { useBreakpoint } = Grid;

const Pricing = ({ paymentMethod, getPackage, selectPackage }) => {
  const history = useHistory();
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const colCount = pricingData.length;

  const { setPages } = useContext(PagesContext)


  const token = useSelector((state) => state.auth.token)
  const profile = useSelector((state) => state.auth.profile)
  const packages = useSelector((state) => state.auth.packages)

  useEffect(() => {
    getPackage()
  }, [])

  const getTheme = async () => {
    localStorage.setItem("is_package_selected", "true");
    localStorage.setItem("is_theme_selected", "true");
    localStorage.setItem("selected_theme_id", `${profile.themeId}`);
    // setIsLoading(true)
    try {
      let res = await axios.post(`${BASE_URL}/themes/get-string/${profile.themeId}/eu`, {},
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
      // setIsLoading(false)

      window.open(`${window.location.href.split(`${window.location.pathname}`)[0]}/app/components/createPage/home`, "_self")
      //history.push("/app/components/createPage/home");
    } catch (error) {
      console.log("error", error);
      // setIsLoading(false)
    }
  };

  useEffect(() => {
    if (profile.isPayment && profile.isSelectTheme) {
      return getTheme()
    } else if (profile.isPayment && !profile.isSelectTheme) {
      history.push("/themes")
    }

  }, [])

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <div className="container text-center">
          <h1 className="text-white ">Pick Plan That Suit </h1>
          <h3
            className=" text-white text-center mt-4 mb-4 mx-auto"
            type="flex"
            justify="center"
          >
            Space, the final frontier. These are the voyages of the Starship
            Enterprise. Its five-year mission.
          </h3>
        </div>
        <Card>
          <Row gutter={16} type="flex" justify="center">
            {packages.map((elm, i) => {
              return (
                <Col
                  key={`price-column-${i}`}
                  xs={24}
                  sm={24}
                  md={24 / colCount}
                  lg={24 / colCount}
                  className={
                    colCount === i + 1 || isMobile ? "" : "border-right "
                  }
                >
                  <div className="p-3">
                    <div className="text-center">
                      {pricingData.map((el, ind) => (
                        <img className="img-fluid" src={i == ind ? el.image : ""} alt="" />
                      ))}
                      <h1 className="display-4 mt-4">
                        <span
                          className="font-size-md d-inline-block mr-1"
                          style={{ transform: "translate(0px, -17px)" }}
                        >
                          $
                        </span>
                        <span>{elm.price}</span>
                      </h1>
                      {/* <p className="mb-0">{'per month'}</p> */}
                      <p className="mb-0">{elm.expiryDate}</p>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-center font-weight-semibold">
                        {elm.name}
                      </h2>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <div>
                        {elm.description.map((va, i) => {
                          return (
                            <p key={`pricing-feature-${i}`}>
                              <Badge color={"blue"} />
                              <span>{va}</span>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <Button
                        onClick={() => {

                          // paymentMethod(elm.price, history, token)
                          paymentMethod(elm.price, token)

                          // localStorage.setItem("is_package_selected", "true");
                          // history.push("/themes");
                        }}
                        type="primary"
                      >
                        Select this plan
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card>
      </div>
    </div>
  );
};

// export default Pricing;
export default connect(null, { paymentMethod, getPackage, selectPackage })(Pricing)
