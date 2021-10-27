import api from "../common/api";

export const loginUser = async (inputData, dispatch) => {
  try {
    const response = await api.post("/login", inputData);
    const { access_token } = response.data;
    setAuthToken(access_token);
    if (response.status === 200) {
      dispatch({
        type: "USER_LOADED",
      });
    }
    return response.status;
  } catch (err) {}
};

export const loadUser = async (inputData, dispatch) => {
  try {
    const response = await api.post("/login", inputData);
    console.log(response);
  } catch (err) {}
};
export const setAuthToken = (token) => {
  api.defaults.headers.common["Authorization"] = "Bearer " + token;
  localStorage.setItem("access_token", token);
};
