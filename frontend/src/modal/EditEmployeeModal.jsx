import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as CloseIcon } from "../styles/svg/x.svg";
import { updateEmployee } from "../common/employee";

const EditEmployeeModal = ({ employee, closeModal }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...employee });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    await updateEmployee(form, dispatch);
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
                    value={form.firstName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>First Name</label>
                </div>

                <div className="group">
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Last Name</label>
                </div>

                <div className="group">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Phone</label>
                </div>
                <div className="group">
                  <input
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Address</label>
                </div>
                <div className="group">
                  <input
                    type="text"
                    name="roll"
                    value={form.roll}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label>Roll</label>
                </div>
              </div>
              <div className="login-buttons">
                <button className="btn-primary" onClick={() => handleSubmit()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
