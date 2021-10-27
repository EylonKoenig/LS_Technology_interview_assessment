import React from "react";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  return <Switch></Switch>;
};

export default PrivateRoutes;
