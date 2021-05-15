import axios from "axios";
import { matchStock, getLineItems } from "../util/Util";

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
  const { qtyError, ...cart } = getState().cart;
  return axios
    .post("https://restful-goods.herokuapp.com/api/carts", cart, { headers })
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
    .get("https://restful-goods.herokuapp.com/api/carts/session", { headers })
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
      .get("https://restful-goods.herokuapp.com/api/items/" + path)
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
      .get("https://restful-goods.herokuapp.com/api/items/" + pathname)
      .then((res) => {
        let storeQty = matchStock(res.data.stock, type).qty;
        return qty > storeQty;
      });
  };

export const saveGuest = () => (dispatch, getState) => {
  return axios
    .post("https://restful-goods.herokuapp.com/api/carts/guest", { cart: getState().cart })
    .then((res) => {
      localStorage.setItem("guestCart", res.data);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const fetchGuest = (cartToken) => (dispatch) => {
  const headers = { "x-access-token": cartToken };
  return axios
    .get("https://restful-goods.herokuapp.com/api/carts/guest", { headers })
    .then(({ data }) => {
      localStorage.setItem("guestCart", data.newToken);
      dispatch(loginCart(data.cart));
      return data.cart;
    })
    .catch((err) => {
      // whether token is invalid or expired, remove and issue a new empty one
      localStorage.removeItem("guestCart");
      dispatch(saveGuest());
      return err.response.data.message;
    });
};

export const fetchStripe = (amt) => (dispatch, getState) => {
  const items = getState().cart.items;
  const lineitems = getLineItems(items);
  return axios
    .post("https://restful-goods.herokuapp.com/api/checkout", { amt, lineitems })
    .then((res) => {
      return Promise.resolve(res.data.clientSecret);
    })
    .catch((err) => console.log(err));
};

export const fetchCard = (paymethod) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/checkout/" + paymethod)
    .then((res) => Promise.resolve(res.data.card))
    .catch((err) => console.log(err));
};
