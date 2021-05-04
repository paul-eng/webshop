import axios from "axios";
import { matchStock } from "../util/Util";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART = "SET_CART";
export const SET_ERROR = "SET_ERROR";
export const LOGIN_CART = "LOGIN_CART";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (item, version) => {
  return {
    type: ADD_TO_CART,
    item,
    version,
  };
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    item,
  };
};

export const setCart = (path, version, qty) => {
  return {
    type: SET_CART,
    path,
    version,
    qty,
  };
};

export const setError = () => {
  return {
    type: SET_ERROR,
  };
};

export const loginCart = (cart) => {
  return {
    type: LOGIN_CART,
    cart,
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const saveCart = (token) => (dispatch, getState) => {
  const headers = { "x-access-token": token };
  const { error, ...cart } = getState().cart;
  return axios
    .post("http://localhost:8080/api/carts", cart, { headers })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
};

export const fetchCart = (token) => (dispatch) => {
  const headers = { "x-access-token": token };
  return axios
    .get("http://localhost:8080/api/carts/session", { headers })
    .then((res) => dispatch(loginCart(res.data)))
    .catch((err) => {
      console.log(err.response.data.error);
    });
};

export const updateCart = (updates) => (dispatch, getState) => {
  let proms = [];
  updates.forEach((update) => {
    let [path, type, qty] = [update.id, update.name, parseInt(update.value)];

    let prom = axios
      .get("http://localhost:8080/api/items/" + path)
      .then((res) => {
        let storeQty = matchStock(res.data.stock, type).qty;
        if (qty > storeQty) {
          return dispatch(setError());
        }
      });
    proms.push(prom);
  });

  Promise.all(proms).then(() => {
    getState().cart.error
      ? dispatch(clearError())
      : updates.forEach((update) => {
          let [path, type, qty] = [
            update.id,
            update.name,
            parseInt(update.value),
          ];
          return dispatch(setCart(path, type, qty));
        });
  });
};
