import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
  SET_ERROR,
  CLEAR_ERROR,
} from "../actions/CartActions";

const initState = {
  items: [],
  total: 0,
  count: 0,
  error: null,
};
const cartReducer = (state = initState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case ADD_TO_CART:
      let inCart = state.items.find((item) => item._id === action.item._id);
      if (inCart) {
        let cartTypes = inCart.stock.map((opt) => opt.type);

        cartTypes.includes(action.version)
          ? inCart.stock.find((version) => version.type === action.version)
              .qty++
          : inCart.stock.push({ type: action.version, qty: 1 });
        return Object.assign({}, state, {
          total: state.total + inCart.price,
          count: state.count + 1,
        });
      } else {
        let newItem = Object.assign({}, action.item, {
          stock: [{ type: action.version, qty: 1 }],
        });
        return Object.assign({}, state, {
          items: [...state.items, newItem],
          total: state.total + newItem.price,
          count: state.count + 1,
        });
      }
    case SET_ERROR:
      return Object.assign({}, state, {
        error: "The requested qty is not available",
      });
    case CLEAR_ERROR:
      alert(state.error);
      return Object.assign({}, state, { error: null });
    case SET_CART:
      let cartStock = state.items.find((item) => item.pathname === action.path).stock;
      let stockType = cartStock.find((v) => (v.type === action.version));
      stockType.qty = action.qty;
      return state;
    case REMOVE_FROM_CART:
      let cartItem = state.items.find((item) => item._id === action.item._id);
      let stock = action.item.stock;
      let cost = action.item.price * stock.qty;
      let newTotal = state.total - cost;
      let newCount = state.count - stock.qty;
      let remaining = cartItem.stock.filter(
        (version) => version.type !== stock.type
      );
      if (remaining.length === 0) {
        let newCart = state.items.filter((item) => item !== cartItem);
        return { items: newCart, total: newTotal, count: newCount };
      } else {
        cartItem.stock = remaining;
        return { items: state.items, total: newTotal, count: newCount };
      }
    default:
      return state;
  }
};

export default cartReducer;
