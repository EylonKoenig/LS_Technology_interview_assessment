import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/table.css";
import { ReactComponent as EditIcon } from "../styles/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "../styles/svg/delete.svg";

import { removeEmployee, titles } from "../common/employee";
import AddEmployeeModal from "../modal/AddEmployeeModal";

const EmployeesTable = ({ employees }) => {
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleDelete = async (employee_id) => {
    removeEmployee(employee_id, dispatch);
  };
  return (
    <div>
      {showAddEmpModal ? (
        <AddEmployeeModal closeModal={() => setShowAddEmpModal(false)} />
      ) : null}
      <div className="employees-table-wrapper">
        <div className="table-headers">
          <h1>Managing Employees</h1>
          <button
            className="btn-primary btn-add-employee"
            onClick={() => setShowAddEmpModal(!showAddEmpModal)}
          >
            + Add Employee
          </button>
        </div>
        <table className="employees-table">
          <thead>
            <tr>
              <th></th>
              {titles.map((title, index) => (
                <th key={index}>{title.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <img
                    src="/svg/login-face.png"
                    alt="logo"
                    height="40"
                    width="40"
                  />
                </td>
                {titles.map((title, index) => (
                  <td key={index}>{employee[title.key]}</td>
                ))}
                {user.group === "user" ? (
                  <>
                    <td>
                      <EditIcon style={{ height: "20px" }} />
                    </td>
                    <td onClick={() => handleDelete(employee.id)}>
                      <DeleteIcon
                        style={{ height: "20px", cursor: "pointer" }}
                      />
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
