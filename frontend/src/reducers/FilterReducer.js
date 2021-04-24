import { SET_FILTERS } from "../actions/FilterActions";

const initState = {
  brand: [],
  category: [],
};

const FilterReducer = (state = initState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_FILTERS:
      return Object.assign({}, state, {
        brand: action.brand,
        category: action.category,
      });
    default:
      return state;
  }
};

export default FilterReducer;
