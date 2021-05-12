import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
  CLEAR_CART,
  LOGIN_CART,
  QTY_ERROR,
  CLEAR_ERROR,
} from "../actions/CartActions";

import { stockTypes, matchItem, matchStock, mergeCarts } from "../util/Util";

const initState = {
  // Find in files: SHAPEOFCARTSTATE. Won't necessarily break if a field is missing in one, but try to keep consistent for peace of mind
  items: [],
  total: 0,
  count: 0,
  qtyError: [],
};
const cartReducer = (state = initState, action) => {
  Object.freeze(state);
  let cartItem, stock, newCount, newTotal, errors, errorCode;

  switch (action.type) {
    case ADD_TO_CART:
      cartItem = matchItem(state.items, action.item._id);
      if (cartItem) {
        stockTypes(cartItem.stock).includes(action.version)
          ? matchStock(cartItem.stock, action.version).qty++
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
    case QTY_ERROR:
      errors = [...state.qtyError];
      errorCode = action.item.name + action.item.stock.type;
      if (!errors.includes(errorCode)) errors.push(errorCode);
      return Object.assign({}, state, { qtyError: errors });
    case CLEAR_ERROR:
      errors = [...state.qtyError];
      errorCode = action.item.name + action.item.stock.type;
      if (errors.includes(errorCode)) {
        errors = errors.filter((err) => err !== errorCode);
      }
      return Object.assign({}, state, { qtyError: errors });
    case SET_CART:
      cartItem = state.items.find((item) => item.pathname === action.path);
      stock = matchStock(cartItem.stock, action.version);
      let diff = action.qty - stock.qty;
      stock.qty = action.qty;
      newTotal = state.total + diff * cartItem.price;
      newCount = state.count + diff;
      return Object.assign({}, state, { count: newCount, total: newTotal });
    case REMOVE_FROM_CART:
      cartItem = matchItem(state.items, action.item._id);
      stock = action.item.stock;
      newTotal = state.total - cartItem.price * stock.qty;
      newCount = state.count - stock.qty;
      let remaining = cartItem.stock.filter(
        (version) => version.type !== stock.type
      );
      if (remaining.length === 0) {
        let newCart = state.items.filter((item) => item !== cartItem);
        return Object.assign({}, state, {
          items: newCart,
          total: newTotal,
          count: newCount,
        });
      } else {
        cartItem.stock = remaining;
        return Object.assign({}, state, {
          items: state.items,
          total: newTotal,
          count: newCount,
        });
      }
    case LOGIN_CART:
      let merge = mergeCarts(state, action.cart)
      return merge;
    case CLEAR_CART:
      return {
        // Find in files: SHAPEOFCARTSTATE. Won't necessarily break if a field is missing in one, but try to keep consistent for peace of mind
        items: [],
        total: 0,
        count: 0,
        qtyError: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
