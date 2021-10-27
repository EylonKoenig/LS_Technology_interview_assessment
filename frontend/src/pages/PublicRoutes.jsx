import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact component={Login} />
    </Switch>
  );
};

export default PublicRoutes;
