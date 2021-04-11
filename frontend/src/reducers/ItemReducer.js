import { SET_ITEMS, SET_ITEM, CLEAR_ITEM } from "../actions/ItemActions";

const initState = {
  itemList: [],
  itemInfo: {},
};
const itemReducer = (state = initState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_ITEMS:
      return Object.assign({}, state, { itemList: action.payload });
    case SET_ITEM:
      return Object.assign({}, state, { itemInfo: action.payload });
    case CLEAR_ITEM:
      return Object.assign({}, state, { itemInfo: {} });
    default:
      return state;
  }
};

export default itemReducer;
