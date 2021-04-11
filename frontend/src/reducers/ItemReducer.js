import { SET_ITEMS } from "../actions/ItemActions";

const initState = {
  itemList: [],
  itemInfo: "",
};
const itemReducer = (state = initState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_ITEMS:
      return Object.assign({}, state, { itemList: action.payload });
    default:
        return state;
  }
};

export default itemReducer;
