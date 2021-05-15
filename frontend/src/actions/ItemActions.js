import axios from "axios";

export const SET_ITEMS = "SET_ITEMS";
export const SET_ITEM = "SET_ITEM";
export const CLEAR_ITEM = "CLEAR_ITEM";
export const CLEAR_ALL_ITEMS = "CLEAR_ALL_ITEMS";

export const setItems = ({ items, results }) => {
  return {
    type: SET_ITEMS,
    items,
    results: results[0],
  };
};

export const setItem = (item) => {
  return {
    type: SET_ITEM,
    item,
  };
};

export const clearItem = () => {
  return {
    type: CLEAR_ITEM,
  };
};

export const clearAllItems = () => {
  return {
    type: CLEAR_ALL_ITEMS,
  };
};

export const fetchItem = (path) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/" + path)
    .then((res) => dispatch(setItem(res.data)))
    .catch((err) => console.log(err.response));
};

export const fetchSearch = (
  searchTerms,
  { sort, brand, category, p = 1 } = {},
  paginate = true
) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/search", {
      params: { searchTerms, sort, brand, category, p, paginate },
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchAllItems = (
  { sort, brand, category, p = 1 } = {},
  paginate = true
) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items", {
      params: { sort, brand, category, p, paginate },
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchBrand = (
  brandURI,
  { sort, brand, category, p = 1 } = {},
  paginate = true
) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/brand/" + brandURI, {
      params: { sort, brand, category, p, paginate },
    })
    .then((res) => dispatch(setItems(res.data)))
};

export const fetchCategory = (
  cat,
  { sort, brand, category, p = 1 } = {},
  paginate = true
) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/category/" + cat, {
      params: { sort, brand, category, p, paginate },
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchNew = (
  { sort, brand, category, p = 1 } = {},
  paginate = true
) => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/new", {
      params: { sort, brand, category, p, paginate },
    })
    .then((res) => dispatch(setItems(res.data)));
};
