import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as LogoutIcon } from "../styles/svg/logout.svg";

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <div className="close-button">
      <LogoutIcon
        style={{ height: "15px" }}
        onClick={() => dispatch({ type: "USER_LOGOUT" })}
      />
    </div>
  );
};

export default Logout;
