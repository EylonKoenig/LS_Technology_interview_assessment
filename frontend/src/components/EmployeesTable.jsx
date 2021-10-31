import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/table.css";
import { ReactComponent as EditIcon } from "../styles/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "../styles/svg/delete.svg";

import { removeEmployee, titles } from "../common/employee";
import AddEmployeeModal from "../modal/AddEmployeeModal";
import EditEmployeeModal from "../modal/EditEmployeeModal";
import Header from "./Header";

const EmployeesTable = ({ employees }) => {
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);

  const [showEditEmpModal, setShowEditEmpModal] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const handleDelete = async (employee_id) => {
    removeEmployee(employee_id, dispatch);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setShowEditEmpModal(true);
  };
  return (
    <div>
      {/* modals */}
      {showAddEmpModal ? (
        <AddEmployeeModal closeModal={() => setShowAddEmpModal(false)} />
      ) : null}
      {showEditEmpModal ? (
        <EditEmployeeModal
          employee={employeeToEdit}
          closeModal={() => setShowEditEmpModal(false)}
        />
      ) : null}

      <Header user={user} />
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
        {employees && employees.length ? (
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
                      src={`/person_${index + 1}.png`}
                      alt="employee"
                      height="40"
                      width="40"
                    />
                  </td>
                  {titles.map((title, index) => (
                    <td key={index}>{employee[title.key]}</td>
                  ))}
                  {user.group === "user" ? (
                    <>
                      <td onClick={() => handleEdit(employee)}>
                        <EditIcon />
                      </td>
                      <td onClick={() => handleDelete(employee.id)}>
                        <DeleteIcon />
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default EmployeesTable;
