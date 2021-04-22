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

  let cartItem, stock, newCount, newTotal;

  switch (action.type) {
    case ADD_TO_CART:
      cartItem = state.items.find((item) => item._id === action.item._id);
      if (cartItem) {
        let cartTypes = cartItem.stock.map((opt) => opt.type);

        cartTypes.includes(action.version)
          ? cartItem.stock.find((version) => version.type === action.version)
              .qty++
          : cartItem.stock.push({ type: action.version, qty: 1 });
        return Object.assign({}, state, {
          total: state.total + cartItem.price,
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
      cartItem = state.items.find((item) => item.pathname === action.path);
      stock = cartItem.stock.find((v) => v.type === action.version);
      let diff = action.qty - stock.qty;
      stock.qty = action.qty;
      newTotal = state.total + diff * cartItem.price;
      newCount = state.count + diff;

      return Object.assign({}, state, { count: newCount, total: newTotal });
    case REMOVE_FROM_CART:
      cartItem = state.items.find((item) => item._id === action.item._id);
      stock = action.item.stock;
      newTotal = state.total - cartItem.price * stock.qty;
      newCount = state.count - stock.qty;
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
