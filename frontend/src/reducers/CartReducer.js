import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/CartActions";

const initState = {
  items: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case ADD_TO_CART:
      let inCart = state.items.find((item) => item._id === action.item._id);
      if (inCart) {
        let quantity = inCart.quantity;
        quantity.flat().includes(action.version)
          ? quantity.find((version) => version[0] === action.version)[1]++
          : quantity.push([action.version, 1]);
        return Object.assign({}, state, { total: state.total + inCart.price });
      } else {
        let newItem = Object.assign({}, action.item, {
          quantity: [[action.version, 1]],
        });
        return Object.assign({}, state, {
          items: [...state.items, newItem],
          total: state.total + newItem.price,
        });
      }
    case REMOVE_FROM_CART:
      let cartItem = state.items.find((item) => item._id === action.item._id);
      let cost = action.item.price * action.item.quantity[1];
      let newTotal = state.total - cost;
      let remaining = cartItem.quantity.filter(
        (version) => version !== action.item.quantity
      );
      if (remaining.length === 0) {
        let newCart = state.items.filter((item) => item !== cartItem);
        return { items: newCart, total: newTotal };
      } else {
        cartItem.quantity = remaining;
        return { items: state.items, total: newTotal };
      }
    default:
      return state;
  }
};

export default cartReducer;
