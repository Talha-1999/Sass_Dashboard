import React, { useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH, PACKAGES_PREFIX_PATH, THEMES_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import PackagesLayout from "layouts/packages-layout";
import ThemesLayout from "layouts/themes-loyout";
import { profile } from "redux/actions/Auth";

function RouteInterceptor({ children, isAllowed, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAllowed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_PREFIX_PATH,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



export const Views = (props) => {
  const { locale, token, location, direction, profile } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  console.log(direction, '//////')

  const isPackagesSelected = localStorage.getItem('is_package_selected') == 'true' ? true : false
  const isThemeSelected = localStorage.getItem('is_theme_selected') == 'true' ? true : false


  useEffect(() => {
    if (token) {
      profile(token)
    }

  }, [location])

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={isPackagesSelected && isThemeSelected ? APP_PREFIX_PATH : PACKAGES_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor path={PACKAGES_PREFIX_PATH} isAllowed={token}>
            <PackagesLayout direction={direction} location={location} />
          </RouteInterceptor>
          <RouteInterceptor path={THEMES_PREFIX_PATH} isAllowed={token && isPackagesSelected}>
            <ThemesLayout direction={direction} location={location} />
          </RouteInterceptor>
          <RouteInterceptor path={APP_PREFIX_PATH} isAllowed={token && isPackagesSelected && isThemeSelected}>
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}


const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token } = auth;
  return { locale, direction, token }
};
const mapDispatchToProps = {
  profile,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Views));