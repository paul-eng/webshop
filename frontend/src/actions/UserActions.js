import axios from "axios";

export const login = (user) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/users/login", user)
    .then((res) => {
      console.log(res.data);
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
