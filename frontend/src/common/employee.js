import api from "./api";

export const fetchEmployees = async (dispatch) => {
  try {
    const response = await api.get("/employees");
    if (response.status === 200) {
      const employees = response.data.map(modifyEmployee);
      dispatch({
        type: "FETCH_EMPLOYEES",
        payload: employees,
      });
    }
  } catch (err) {}
};

export const postEmployee = async (inputData, dispatch) => {
  try {
    const response = await api.post("/employee", inputData);
    if (response.status === 200) {
      dispatch({
        type: "ADD_EMPLOYEE",
        payload: modifyEmployee(response.data),
      });
    }
  } catch (err) {}
};

export const removeEmployee = async (id, dispatch) => {
  try {
    await api.delete("/employee", { data: { id } });
    dispatch({
      type: "DELETE_EMPLOYEE",
      payload: id,
    });
  } catch (err) {}
};

export const updateEmployee = async (inputData, dispatch) => {
  await api.put("/employee", inputData);
  dispatch({
    type: "UPDATE_EMPLOYEE",
    payload: inputData,
  });
};

function modifyEmployee(employee) {
  employee.id = employee._id.$oid;
  delete employee._id;
  const date = new Date(employee.created.$date).toDateString().split(" ");
  employee.created = date[2] + " " + date[1] + " " + date[3];
  return employee;
}

export const titles = [
  // { label: "image", key: "imageUrl" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Phone", key: "phone" },
  { label: "Address", key: "address" },
  { label: "Roll", key: "roll" },
  { label: "Start Date", key: "created" },
];
