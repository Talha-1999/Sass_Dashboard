import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Components = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/createPage/home`} />
      {/* <Redirect exact from={`${match.url}`} to={`${match.url}/post`} /> */}
      <Route path={`${match.url}/post`} component={lazy(() => import(`./post`))} />
      <Route path={`${match.url}/createPage/:pageName`} component={lazy(() => import(`./createPage`))} />
    </Switch>
  </Suspense>
);

export default Components;