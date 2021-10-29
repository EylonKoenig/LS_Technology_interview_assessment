import api from "./api";

export const fetchEmployees = async (dispatch) => {
  try {
    const response = await api.get("/employees");
    if (response.status === 200) {
      const employees = response.data.map((employee) => {
        delete employee._id;
        const date = new Date(employee.created.$date).toDateString().split(" ");
        employee.created = date[2] + " " + date[1] + " " + date[3];
        employee.roll = "admin";
        employee.address = "hahrav al nekeva";
        employee.phone = "0527456008";
        return employee;
      });
      dispatch({
        type: "FETCH_EMPLOYEES",
        payload: employees,
      });
    }
  } catch (err) {}
};

export const titles = [
  // { label: "image", key: "imageUrl" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Phone", key: "phone" },
  { label: "Address", key: "address" },
  { label: "Roll", key: "roll" },
  { label: "Start Date", key: "created" },
];
