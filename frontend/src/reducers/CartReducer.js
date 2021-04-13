import { ADD_TO_CART } from "../actions/CartActions";

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
        // If specific version already in cart, increment count, otherwise push one onto array
        let versions = inCart.quantity;
        if (versions.flat().includes(action.version)) {
          versions.find((version) => version[0] === action.version)[1]++;
        } else {
          versions.push([action.version, 1]);
        }
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
    default:
      return state;
  }
};

export default cartReducer;
