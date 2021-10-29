import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../common/auth";
import { useDispatch } from "react-redux";
import PersonLogo from "../components/PersonLogo";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({});
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfimShow, setPasswordConfimShow] = useState(false);

  const redirectToLogin = () => {
    history.push("/login");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form, dispatch);
    if (res === 201) {
      history.push("/employees");
    }
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
              <input
                type="text"
                name="firstName"
                onChange={(e) => handleChange(e)}
                required
              />
              <label>First Name</label>
            </div>

            <div className="group">
              <input
                type="text"
                name="lastName"
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Last Name</label>
            </div>

            <div className="group">
              <input
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Email</label>
            </div>
            <div className="inputs-label">
              <span> Password</span>
            </div>
            <div className="group">
              <input
                name="password"
                type={passwordShow ? "text" : "password"}
                onChange={(e) => handleChange(e)}
                autoComplete={false}
                required
              />
              <img
                as="button"
                className="view-svg"
                onClick={() => setPasswordShow(!passwordShow)}
                src={passwordShow ? "/svg/view off.svg" : "/svg/view.svg"}
                alt="view-svg"
              />
              <label>Password</label>
            </div>

            <div className="group">
              <input
                type={passwordConfimShow ? "text" : "password"}
                name="password_confirm"
                onChange={(e) => handleChange(e)}
                required
              />
              <img
                as="button"
                className="view-svg"
                onClick={() => setPasswordConfimShow(!passwordConfimShow)}
                src={passwordShow ? "/svg/view off.svg" : "/svg/view.svg"}
                alt="view-svg"
              />
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
