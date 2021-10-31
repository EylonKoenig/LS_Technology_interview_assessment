import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../common/auth";
import { useDispatch } from "react-redux";
import PersonLogo from "../components/PersonLogo";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfimShow, setPasswordConfimShow] = useState(false);

  const INITIAL_VALIDATOIN = {
    error: "",
    firstNameNotField: false,
    lastNameNotField: false,
    passwordNotField: false,
    password_confirmNotField: false,
  };
  const [validationError, setValidationError] = useState(INITIAL_VALIDATOIN);

  const redirectToLogin = () => {
    history.push("/login");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
    setValidationError(INITIAL_VALIDATOIN);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormNotValid()) return;
    const res = await registerUser(form, dispatch);
    if (res === 201) {
      history.push("/employees");
    } else {
      setValidationError({
        ...INITIAL_VALIDATOIN,
        error: "Email is already registered",
      });
    }
  };

  const isFormNotValid = () => {
    let isNotValid = false;
    let tempValidation = INITIAL_VALIDATOIN;
    for (let key in form) {
      if (!form[key]) {
        tempValidation = { ...tempValidation, [`${key}NotField`]: true };
        isNotValid = true;
      }
    }
    if (form.password !== form.password_confirm) {
      tempValidation = {
        ...tempValidation,
        error: "Password and confirm password don't match",
      };
      isNotValid = true;
    }
    setValidationError(tempValidation);
    return isNotValid;
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
              {validationError.error ? (
                <div className="color-error">{validationError.error}</div>
              ) : null}
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
              {validationError.firstNameNotField ? (
                <div className="color-error">First Name can't be blank</div>
              ) : null}
            </div>

            <div className="group">
              <input
                type="text"
                name="lastName"
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Last Name</label>
              {validationError.lastNameNotField ? (
                <div className="color-error">Last Name can't be blank</div>
              ) : null}
            </div>

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
            <div className="inputs-label">
              <span> Password</span>
            </div>
            <div className="group">
              <input
                name="password"
                type={passwordShow ? "text" : "password"}
                onChange={(e) => handleChange(e)}
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

            <div className="group">
              <input
                type={passwordConfimShow ? "text" : "password"}
                name="password_confirm"
                onChange={(e) => handleChange(e)}
                autoComplete={"off"}
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
              {validationError.password_confirmNotField ? (
                <div className="color-error">
                  Password Retype can't be blank
                </div>
              ) : null}
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
