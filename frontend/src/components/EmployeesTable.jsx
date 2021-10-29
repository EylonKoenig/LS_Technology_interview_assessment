import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/table.css";
import { ReactComponent as EditIcon } from "../styles/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "../styles/svg/delete.svg";

import { titles } from "../common/employee";
import AddEmployeeModal from "../modal/AddEmployeeModal";
const EmployeesTable = ({ employees }) => {
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="employees-table-wrapper">
        <div className="table-headers">
          <h1>Managing Employees</h1>
          <button
            className="btn-primary btn-add-employee"
            onClick={() => setShowAddEmpModal(!showAddEmpModal)}
          >
            + Add Employee
          </button>
          <AddEmployeeModal />
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
                    <td>
                      <DeleteIcon style={{ height: "20px" }} />
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
