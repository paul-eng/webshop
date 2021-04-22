import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART = "SET_CART";

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

export const setCart = (item, version, qty) => {
  return {
    type: SET_CART,
    item,
    version,
    qty,
  };
};

export const updateCart = (path, version, qty) => (dispatch, getState) => {
  return axios.get("http://localhost:8080/api/items/" + path).then((res) => {
    let storeQty = res.data.stock.find((v) => v.type === version).qty;
    if (qty > storeQty) {
    //   return `error ${res.data.name}`;
    // } else {
      return dispatch(setCart(res.data, version, qty));
    }
  }).then(()=>{
    console.log(getState())
  });
};
