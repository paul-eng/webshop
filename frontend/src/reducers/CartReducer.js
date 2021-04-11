import { ADD_TO_CART } from "../actions/CartActions";

const initState = {
  items: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case ADD_TO_CART:
      let newItem = action.payload;
      let inCart = state.items.find((item) => item._id === newItem._id);

      if (inCart) {
        inCart.quantity += 1;
        return Object.assign({}, state, { total: state.total + inCart.price });
      } else {
        let newCopy = Object.assign({}, newItem, { quantity: 1 });
        return Object.assign({}, state, {
          items: [...state.items, newCopy],
          total: state.total + newCopy.price,
        });
      }
    default:
      return state;
  }
};

export default cartReducer;
