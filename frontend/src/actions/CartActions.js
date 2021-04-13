export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (item, version) => {
  return {
    type: ADD_TO_CART,
    item,
    version,
  };
};
