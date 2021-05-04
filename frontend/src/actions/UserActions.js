import axios from "axios";

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

export const setUser = ({ user, token }) => {
  localStorage.setItem("session", token);
  return {
    type: SET_USER,
    user,
  };
};

export const clearUser = () => {
  return { type: CLEAR_USER };
};

export const login = (user) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/users/login", user)
    .then((res) => {
      dispatch(setUser(res.data));
      return Promise.resolve(res.data.token);
    })
    .catch((err) => alert(err.response.data.error));
};

export const logout = () => (dispatch) => {
  let token = localStorage.getItem("session");
  localStorage.removeItem("session");
  dispatch(clearUser());
  return Promise.resolve(token);
};

export const addUser = (user) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/users", user)
    .then(() => {
      dispatch(login(user));
    })
    .catch((err) => alert(err.response.data.error));
};

export const getUser = (token) => (dispatch) => {
  const headers = { "x-access-token": token };
  return axios
    .get("http://localhost:8080/api/users/verify", { headers })
    .then((res) => {
      dispatch(setUser(res.data));
      return Promise.resolve(token);
    })
    .catch((err) => {
      localStorage.removeItem("session");
      alert(err.response.data.error);
    });
};
