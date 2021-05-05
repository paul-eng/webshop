import {
  SET_BRANDS,
  SET_CATEGORIES,
  SET_MSG,
  CLEAR_MSG,
} from "../actions/NavActions";

const initState = {
  brands: [],
  categories: [],
  msg: null,
};

const navReducer = (state = initState, action) => {
  Object.freeze(state);

  //   convert aggregate results from array of objects to alphabetized strings
  let stringify = (array) => array.map((el) => el["_id"]).sort();

  switch (action.type) {
    case SET_BRANDS:
      let brands = stringify(action.brands);
      return Object.assign({}, state, { brands: brands });
    case SET_CATEGORIES:
      let cats = stringify(action.cats);
      return Object.assign({}, state, { categories: cats });
    case SET_MSG:
      return Object.assign({}, state, { msg: action.msg });
    case CLEAR_MSG:
      return Object.assign({}, state, { msg: null });
    default:
      return state;
  }
};

export default navReducer;
