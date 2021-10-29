import React, { useEffect } from "react";
import { fetchEmployees } from "../common/employee";
import useIsMobile from "../customHooks/useIsMobile";
import { useSelector, useDispatch } from "react-redux";
import EmployeesCards from "../components/EmployeesCards";
import EmployeesTable from "../components/EmployeesTable";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const isLoading = useSelector((state) => state.employees.loading);
  const isMobile = useIsMobile();

  useEffect(() => {
    (async function fetchDate() {
      await fetchEmployees(dispatch);
    })();
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          {isMobile ? (
            <EmployeesCards employees={employees} />
          ) : (
            <EmployeesTable employees={employees} />
          )}
        </>
      )}
    </>
  );
};

export default Employees;
