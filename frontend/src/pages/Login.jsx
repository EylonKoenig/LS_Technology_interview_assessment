import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../common/auth";
import { useDispatch } from "react-redux";
import PersonLogo from "../components/PersonLogo";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const INITIAL_VALIDATOIN = {
    error: "",
    emailNotField: false,
    passwordNotField: false,
  };
  const [validationError, setValidationError] = useState(INITIAL_VALIDATOIN);
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
    if (!form.email || !form.password) {
      let tempValidation = INITIAL_VALIDATOIN;
      if (!form.email)
        tempValidation = { ...tempValidation, emailNotField: true };
      if (!form.password)
        tempValidation = { ...tempValidation, passwordNotField: true };

      setValidationError(tempValidation);
      return;
    }
    const res = await loginUser(form, dispatch);
    if (res === 200) {
      history.push("/employees");
    } else {
      setValidationError({
        ...validationError,
        error: "Worng User or Password, Try Again",
      });
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
          {validationError.error ? (
            <div className="color-error">{validationError.error}</div>
          ) : null}
          <div className="inputs">
            <div className="group">
              <input
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Email</label>
              {validationError.emailNotField ? (
                <div className="color-error">Email can't be blank</div>
              ) : null}
            </div>

            <div className="group">
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                type={passwordShow ? "text" : "password"}
                autoComplete={"off"}
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
              {validationError.passwordNotField ? (
                <div className="color-error">Password can't be blank</div>
              ) : null}
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
