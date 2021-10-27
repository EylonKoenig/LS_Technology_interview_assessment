import api from "../common/api";

export const loginUser = async (inputData, dispatch) => {
  try {
    const response = await api.post("/login", inputData);
    const { access_token, refresh_token } = response.data;
    setToken(access_token, refresh_token);
    if (response.status === 200) {
      dispatch({
        type: "USER_LOADED",
      });
    }
    return response.status;
  } catch (err) {}
};

export const loadUser = async (dispatch) => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    if (refresh_token) {
      setToken(refresh_token, access_token);
      const response = await api.post("/refresh");
      if (response.status === 200) {
        const { access_token } = response.data;
        setToken(access_token, refresh_token);
        dispatch({
          type: "USER_LOADED",
        });
      }
    }
  } catch (err) {}
};
export const setToken = (access_token, refresh_token) => {
  if ((access_token, refresh_token)) {
    api.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  }
};
