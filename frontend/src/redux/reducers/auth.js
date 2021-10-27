const INITIAL_STATE = {
  isAuthenticated: null,
  loading: null,
  user: null,
};

export default function auth_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
      delete payload["technologies"];
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: { ...state.user, ...payload },
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
    default:
      return state;
  }
}
