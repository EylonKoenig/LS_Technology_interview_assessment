const INITIAL_STATE = {
  employees: [],
  loading: true,
};

export default function employees_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_EMPLOYEES":
      return {
        ...state,
        employees: payload,
        loading: false,
      };

    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, payload],
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== payload
        ),
      };
    default:
      return state;
  }
}
