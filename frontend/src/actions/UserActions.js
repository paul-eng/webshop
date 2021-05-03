import axios from "axios";

export const SET_USER = "SET_USER";

export const setUser = ({ user, token }) => {
  localStorage.setItem("session", token);
  return {
    type: SET_USER,
    user,
  };
};

export const login = (user) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/users/login", user)
    .then((res) => {
      dispatch(setUser(res.data));
    })
    .catch((err) => alert(err.response.data.error));
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
    })
    .catch((err) => {
      localStorage.removeItem("session")
      alert(err.response.data.error)});
};
