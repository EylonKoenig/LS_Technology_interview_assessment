import React, { useState } from "react";
import { ReactComponent as EllipsisIcon } from "../styles/svg/ellipsis.svg";
import { ReactComponent as PhoneIcon } from "../styles/svg/phone.svg";
import { ReactComponent as FolderIcon } from "../styles/svg/folder.svg";
import { ReactComponent as LocationIcon } from "../styles/svg/location.svg";
import { ReactComponent as PenIcon } from "../styles/svg/pen.svg";
import "../styles/employeesCard.css";
import AddEmployeeModal from "../modal/AddEmployeeModal";
import CardFunctionalityModal from "../modal/CardFunctionalityModal";

const EmployeesCards = ({ employees }) => {
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [showFuncModal, setShowFuncModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const showEditModal = (employee) => {
    setUserToEdit(employee);
    setShowFuncModal(true);
  };

  return (
    <div className="cards-wrapper">
      {showAddEmpModal ? (
        <AddEmployeeModal closeModal={() => setShowAddEmpModal(false)} />
      ) : null}
      {showFuncModal ? (
        <CardFunctionalityModal
          closeModal={() => setShowFuncModal(false)}
          employee={userToEdit}
        />
      ) : null}
      <div className="cards-headers">
        <h3>Managing Employees</h3>
        <span
          className="circle plus"
          onClick={() => setShowAddEmpModal(true)}
        ></span>
      </div>
      <div className="cards">
        {employees.map((employee, index) => (
          <div className="card" key={index}>
            <img
              src={`/person_${index + 1}.png`}
              alt="person"
              height="40"
              width="40"
            />
            <div className="card-details">
              <div>
                <div className="employee-name">
                  <span>{employee.firstName}</span>
                  <span>{employee.lastName}</span>
                </div>
                <div>
                  <FolderIcon />
                  {employee.roll}
                </div>
                <div>
                  <PenIcon />
                  {employee.created}
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
            <div onClick={() => showEditModal(employee)}>
              <EllipsisIcon style={{ height: "15px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesCards;
