import axios from "axios";

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_MSG = "SET_MSG";
export const SET_ADDRESS = "SET_ADDRESS";

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

export const setAddress = (address) => {
  return { type: SET_ADDRESS, address };
};

export const setMsg = (msg) => {
  return {
    type: SET_MSG,
    msg,
  };
};

export const login = (user) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/users/login", user)
    .then((res) => {
      dispatch(setUser(res.data));
      return Promise.resolve(res.data.token);
    })
    .catch((err) => dispatch(setMsg(err.response.data.error)));
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("session");
  dispatch(clearUser());
  return Promise.resolve("Logout successful");
};

export const addUser = (user) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/users", user)
    .then(() => {
      return dispatch(login(user));
    })
    .catch((err) => dispatch(setMsg(err.response.data.error)));
};

export const addAddress = (address, key) => (dispatch) => {
  const headers = { "x-access-token": localStorage.getItem("session") };
  return axios
    .post(
      "http://localhost:8080/api/users/address",
      { address, key },
      { headers }
    )
    .then(
      ({
        data: {
          user: { address },
        },
      }) => {
        return dispatch(setAddress(address));
      }
    )
    .catch((err) => console.log(err.response.data));
};

export const deleteAddress = (key) => (dispatch) => {
  const headers = { "x-access-token": localStorage.getItem("session") };
  return axios
    .delete("http://localhost:8080/api/users/address/" + key, { headers })
    .then(
      ({
        data: {
          user: { address },
        },
      }) => {
        return dispatch(setAddress(address));
      }
    )
    .catch((err) => console.log(err.response.data));
};

export const setDefault = (key) => (dispatch) => {
  const headers = { "x-access-token": localStorage.getItem("session") };
  return axios
    .post("http://localhost:8080/api/users/address/" + key, null, { headers })
    .then(
      ({
        data: {
          user: { address },
        },
      }) => {
        return dispatch(setAddress(address));
      }
    )
    .catch((err) => console.log(err.response.data));
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
      console.log(err.response.data.error);
    });
};

export const getAdmin = (token) => (dispatch) => {
  const headers = { "x-access-token": token };
  return axios
    .get("http://localhost:8080/api/users/admin", { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      localStorage.removeItem("session");
      console.log(err.response.data.error);
    });
};

export const addOrder = (token, summary) => (dispatch) => {
  const headers = { "x-access-token": token };
  return axios
    .post("http://localhost:8080/api/orders/", { summary }, { headers })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 4242 4242 4242 4242
