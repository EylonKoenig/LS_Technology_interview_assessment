import React from "react";
import { Switch, Route } from "react-router-dom";

import Employees from "./Employees";

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path="/employees" component={Employees} />
      <Route exact component={Employees} />
    </Switch>
  );
};

export default PrivateRoutes;
