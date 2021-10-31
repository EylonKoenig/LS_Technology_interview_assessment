import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as CloseIcon } from "../styles/svg/x.svg";
import "../styles/addEmployee.css";
import { postEmployee } from "../common/employee";

const AddEmployeeModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postEmployee(form, dispatch);
    closeModal();
  };
  return (
    <div className="add-employee-wrrap-modal">
      <div className="employee-modal">
        <div className="add-employee">
          <div className="close-button" onClick={() => closeModal()}>
            <CloseIcon />
          </div>
          <h3 className="add-employee-title">Add Employee</h3>
          <div>
            <div className="inputs-wrapper">
              <div className="inputs">
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
                    name="phone"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Phone</label>
                </div>
                <div className="group">
                  <input
                    name="address"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Address</label>
                </div>
                <div className="group">
                  <input
                    type="text"
                    name="roll"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Roll</label>
                </div>
              </div>
              <div className="login-buttons">
                <button
                  className="btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
