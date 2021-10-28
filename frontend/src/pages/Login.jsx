import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../common/auth";
import { useDispatch } from "react-redux";
import PersonLogo from "../components/PersonLogo";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [passwordShow, setPasswordShow] = useState(false);

  const redirectToRegister = () => {
    history.push("/register");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form, dispatch);
    if (res === 200) {
      history.push("/users");
    }
  };
  return (
    <div className="container">
      <form className="login-wrapper">
        <div className="headers">
          <h3>Sign In</h3>
        </div>
        <PersonLogo />
        <div className="inputs-wrapper">
          <div className="inputs">
            <div className="group">
              <input
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Email</label>
            </div>

            <div className="group">
              <input
                type="text"
                name="password"
                onChange={(e) => handleChange(e)}
                type={passwordShow ? "text" : "password"}
                required
              />
              <img
                as="button"
                className="view-svg"
                onClick={() => setPasswordShow(!passwordShow)}
                src={passwordShow ? "/svg/view off.svg" : "/svg/view.svg"}
              />
              <label>Password</label>
            </div>
          </div>
          <div className="login-buttons">
            <button className="btn-primary" onClick={(e) => handleSubmit(e)}>
              Sign In
            </button>
          </div>
        </div>
        <div className="singup-fotter">
          <span>Don't have an account?</span>
          <span
            className="color-light-blue cursor-pointer"
            onClick={redirectToRegister}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
