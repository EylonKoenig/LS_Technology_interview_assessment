import React from "react";
import Logout from "./Logout";

const Header = ({ user }) => {
  return (
    <div className="header">
      <img src="/lt_logo.png" alt="logo" height="40px" />
      <div>
        <div className="user-details">
          <img
            src="/svg/login-face.png"
            alt="logo"
            height="30px"
            width="30px"
          />
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
