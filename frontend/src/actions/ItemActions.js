import axios from "axios";

export const SET_ITEMS = "SET_ITEMS";
export const SET_ITEM = "SET_ITEM";
export const CLEAR_ITEM = "CLEAR_ITEM";
export const CLEAR_ALL_ITEMS = "CLEAR_ALL_ITEMS";

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
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
    .get("http://localhost:8080/api/items/" + path)
    .then((res) => dispatch(setItem(res.data)));
};

export const fetchAllItems = ({sort = "", brand, category} = {}) => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items", {
      params: { sort, brand, category},
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchBrand = (brandURI, {sort = "", brand, category} = {}) => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items/brand/" + brandURI, {
      params: { sort, brand, category },
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchCategory = (cat, {sort = "", brand, category} = {}) => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items/category/" + cat, {
      params: { sort, brand, category},
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchNew = ({sort = "", brand, category} = {}) => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items/new", {
      params: { sort, brand, category },
    })
    .then((res) => dispatch(setItems(res.data)));
};
