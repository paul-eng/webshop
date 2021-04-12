import { SET_BRANDS, SET_CATEGORIES } from "../actions/NavActions";

const initState = {
  brands: [],
  categories: [],
};

const navReducer = (state = initState, action) => {
  Object.freeze(state);

  //   convert aggregate results from array of objects to alphabetized strings
  let stringify = (array) => array.map((el) => el["_id"]).sort();

  switch (action.type) {
    case SET_BRANDS:
      let brands = stringify(action.payload);
      return Object.assign({}, state, { brands: brands });
    case SET_CATEGORIES:
      let cats = stringify(action.payload);
      return Object.assign({}, state, { categories: cats });
    default:
      return state;
  }
};

export default navReducer;
