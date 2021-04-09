import { FETCH_ALL_ITEMS } from "../actions/ItemActions";

const initState = {
  itemList: [{ name: "testCamera" }],
  itemInfo: "",
};
const itemReducer = (state = initState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case FETCH_ALL_ITEMS:
      return Object.assign({}, state, { itemInfo: "DONE BEEN REDUCED" });
    default:
        return state;
  }
};

export default itemReducer;
