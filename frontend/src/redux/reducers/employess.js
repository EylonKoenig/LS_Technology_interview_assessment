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
    default:
      return state;
  }
}
