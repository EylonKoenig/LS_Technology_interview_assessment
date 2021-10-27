import React from "react";
import { useHistory } from "react-router-dom";
import PersonLogo from "../components/PersonLogo";

const Register = ({ handleChange, handleSubmit }) => {
  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="container">
      <form className="login-wrapper">
        <div className="headers">
          <h3>Sign Up</h3>
        </div>
        <PersonLogo />
        <div className="inputs-wrapper">
          <div className="inputs">
            <div className="inputs-label">
              <span> Personal Details</span>
            </div>
            <div className="group">
              <input type="text" required />
              <label>First Name</label>
            </div>

            <div className="group">
              <input type="text" required />
              <label>Last Name</label>
            </div>

            <div className="group">
              <input type="text" required />
              <label>Email</label>
            </div>
            <div className="inputs-label">
              <span> Password</span>
            </div>
            <div className="group">
              <input type="text" required />
              <label>Password</label>
            </div>

            <div className="group">
              <input type="text" required />
              <label>Retype Password</label>
            </div>
          </div>
          <div className="login-buttons">
            <button className="btn-primary" onClick={(e) => handleSubmit(e)}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="singup-fotter">
          <span>Have an account? </span>
          <span
            className="color-light-blue cursor-pointer"
            onClick={redirectToLogin}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
