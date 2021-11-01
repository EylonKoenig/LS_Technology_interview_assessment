const INITIAL_STATE = {
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case "LOADING_USER":
      return {
        ...state,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case "LOADING_FALSE":
      return {
        ...state,
        loading: false,
      };

    case "USER_LOGOUT":
      localStorage.clear();
      return {
        INITIAL_STATE,
      };
    default:
      return state;
  }
}
