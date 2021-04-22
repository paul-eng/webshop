import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART = "SET_CART";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

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

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const updateCart = (updates) => (dispatch, getState) => {
  let proms = [];
  updates.forEach((update) => {
    let [path, type, qty] = [update.id, update.name, update.value];

    let prom = axios
      .get("http://localhost:8080/api/items/" + path)
      .then((res) => {
        let item = res.data;
        let storeQty = item.stock.find((v) => v.type === type).qty;

        if (qty > storeQty) {
          return dispatch(setError());
        } 
      });

    proms.push(prom);
  });

  Promise.all(proms).then(() => {
    if (getState().cart.error) {
      return dispatch(clearError());
    } else {
      updates.forEach((update)=>{
        let [path, type, qty] = [update.id, update.name, update.value];
        return dispatch(setCart(path, type, qty));
      })
    }
  });
};
