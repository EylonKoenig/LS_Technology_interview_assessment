import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeEmployee } from "../common/employee";
import EditEmployeeModal from "./EditEmployeeModal";

const CardFunctionalityModal = ({ closeModal, employee }) => {
  const dispatch = useDispatch();
  const [showEditEmpModal, setShowEditEmpModal] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditEmpModal(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    removeEmployee(employee.id, dispatch);
    closeModal();
  };

  const handleCloseEdit = () => {
    setShowEditEmpModal(false);
    closeModal();
  };

  return (
    <div className="add-employee-wrrap-modal" onClick={() => closeModal()}>
      <div className="employee-modal">
        {showEditEmpModal ? (
          <EditEmployeeModal
            employee={employee}
            closeModal={() => handleCloseEdit()}
          />
        ) : null}
        <div className="card-functionality">
          <div onClick={(e) => handleEdit(e)}>Edit</div>
          <div onClick={(e) => handleDelete(e)}>Delete</div>
        </div>
      </div>
    </div>
  );
};

export default CardFunctionalityModal;
