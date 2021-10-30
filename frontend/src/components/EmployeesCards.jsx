import React from "react";
import { ReactComponent as EllipsisIcon } from "../styles/svg/ellipsis.svg";
import "../styles/employeesCard.css";

const EmployeesCards = ({ employees }) => {
  return (
    <div className="cards-wrapper">
      <div className="cards-headers">
        <h3>Managing Employees</h3>
        <span class="circle plus"></span>
      </div>
      <div className="cards">
        {employees.map((employee, index) => (
          <div className="card">
            <img src="/svg/login-face.png" alt="logo" height="40" width="40" />
            <div>
              <div>
                <span>{employee.firstName}</span>
                <span>{employee.lastName}</span>
                <div />
                <div>{employee.roll}</div>
                <div>{employee.phone}</div>
                <div>{employee.address}</div>
              </div>
            </div>
            <EllipsisIcon style={{ height: "15px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesCards;
