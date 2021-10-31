import React from "react";
import { ReactComponent as EllipsisIcon } from "../styles/svg/ellipsis.svg";
import { ReactComponent as PhoneIcon } from "../styles/svg/phone.svg";
import { ReactComponent as FolderIcon } from "../styles/svg/folder.svg";
import { ReactComponent as LocationIcon } from "../styles/svg/location.svg";
import "../styles/employeesCard.css";

const EmployeesCards = ({ employees }) => {
  return (
    <div className="cards-wrapper">
      <div className="cards-headers">
        <h3>Managing Employees</h3>
        <span className="circle plus"></span>
      </div>
      <div className="cards">
        {employees.map((employee, index) => (
          <div className="card" key={index}>
            <img src="/svg/login-face.png" alt="logo" height="40" width="40" />
            <div className="card-details">
              <div>
                <span>{employee.firstName}</span>
                <span>{employee.lastName}</span>
                <div />
                <div>
                  <FolderIcon />
                  {employee.roll}
                </div>
                <div>
                  <PhoneIcon />
                  {employee.phone}
                </div>
                <div>
                  <LocationIcon />
                  {employee.address}
                </div>
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
