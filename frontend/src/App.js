import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import "./index.css";
import "./input.css";

import { loadUser } from "./common/auth";

import PublicRoutes from "./pages/PublicRoutes";
import PrivateRoutes from "./pages/PrivateRoutes";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchUser() {
      await loadUser(dispatch);
    })();
  }, [dispatch]);
  return (
    <div className="App">
      {auth.loading ? (
        <div></div>
      ) : (
        <Switch>
          <Route
            path="/"
            render={() =>
              auth.isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />
            }
          />
        </Switch>
      )}
    </div>
  );
};

export default App;
