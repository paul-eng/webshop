import { ADD_TO_CART } from "../actions/CartActions";

const initState = {
  items: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case ADD_TO_CART:
      let inCart = state.items.find((item) => item._id === action.payload._id);

      if (inCart) {
        inCart.quantity += 1;
        return Object.assign({}, state, { total: state.total + inCart.price });
      } else {
        let newItem = Object.assign({}, action.payload, { quantity: 1 });
        return Object.assign({}, state, {
          items: [...state.items, newItem],
          total: state.total + newItem.price,
        });
      }
    default:
      return state;
  }
};

export default cartReducer;
