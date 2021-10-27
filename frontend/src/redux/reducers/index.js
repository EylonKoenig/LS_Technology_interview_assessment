import { combineReducers } from "redux";
import auth from "./auth";

const appReducer = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    document.cookie =
      "refresh = ; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.clear();
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
