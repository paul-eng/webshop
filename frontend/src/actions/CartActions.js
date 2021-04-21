export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART = "UPDATE_CART";

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

export const updateCart = (id, version, qty) => {
  return {
    type: UPDATE_CART,
    id,
    version,
    qty,
  };
};
