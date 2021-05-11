import axios from "axios";
import { matchStock } from "../util/Util";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART = "SET_CART";
export const LOGIN_CART = "LOGIN_CART";
export const CLEAR_CART = "CLEAR_CART";
export const QTY_ERROR = "QTY_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_MSG = "SET_MSG";

export const setMsg = (msg) => {
  return {
    type: SET_MSG,
    msg,
  };
};

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

export const qtyError = (item) => {
  return {
    type: QTY_ERROR,
    item,
  };
};

export const clearError = (item) => {
  return {
    type: CLEAR_ERROR,
    item,
  };
};

export const loginCart = (cart) => {
  return {
    type: LOGIN_CART,
    cart,
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
          return dispatch(setMsg("The requested qty is not available"));
        }
      });
    proms.push(prom);
  });

  Promise.all(proms).then(() => {
    if (!getState().nav.msg)
      updates.forEach((update) => {
        let [path, type, qty] = [
          update.id,
          update.name,
          parseInt(update.value),
        ];
        return dispatch(setCart(path, type, qty));
      });
  });
};

export const checkQty =
  ({ pathname, stock: { qty }, stock: { type } }) =>
  (dispatch) => {
    return axios
      .get("http://localhost:8080/api/items/" + pathname)
      .then((res) => {
        let storeQty = matchStock(res.data.stock, type).qty;
        return qty > storeQty;
      });
  };

export const fetchStripe = (amt) => (dispatch) => {
  return axios
    .post("http://localhost:8080/api/checkout", {amt})
    .then((res) => {
      return Promise.resolve(res.data.clientSecret);
    })
    .catch((err) => console.log(err));
};
