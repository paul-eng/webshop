import {
  SET_ITEMS,
  SET_ITEM,
  CLEAR_ITEM,
  CLEAR_ALL_ITEMS,
  SET_MODAL,
  CLEAR_MODAL
} from "../actions/ItemActions";

const initState = {
  itemList: [],
  itemInfo: {},
  count: 0,
  modal: null,
};
const itemReducer = (state = initState, action) => {
  Object.freeze(state);
  let count = action.results ? action.results.count : 0;

  switch (action.type) {
    case SET_ITEMS:
      return Object.assign({}, state, { itemList: action.items, count: count });
    case SET_ITEM:
      return Object.assign({}, state, { itemInfo: action.item });
    case CLEAR_ITEM:
      return Object.assign({}, state, { itemInfo: {} });
    case CLEAR_ALL_ITEMS:
      return Object.assign({}, state, { itemList: [] });
    case SET_MODAL:
      return Object.assign({}, state, { modal: action.idx });
    case CLEAR_MODAL:
      return Object.assign({}, state, { modal: null });
    default:
      return state;
  }
};

export default itemReducer;
