import React from "react";
import { Switch, Route } from "react-router-dom";

import Users from "./Users";

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path="/users" component={Users} />
    </Switch>
  );
};

export default PrivateRoutes;
