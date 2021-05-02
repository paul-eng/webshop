import axios from "axios";

export const addUser = (user) => (dispatch) => {
  return axios.post("http://localhost:8080/api/users", user).then((res) => {
    console.log(res);
  })
  .catch((err)=>alert(err.response.data.error));
};
