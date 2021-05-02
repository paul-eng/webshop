import axios from "axios";

export const SET_USER = "SET_USER";

export const setUser = ({ user, token }) => {
  return {
    type: SET_USER,
    user,
    token,
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
