import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProjectList from "./pricing/pricing";
import Scrumboard from "./themes";

const Project = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/pricing`} component={ProjectList} />
      <Route path={`${match.url}/themes`} component={Scrumboard} />
    </Switch>
  );
};

export default Project;
