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

export const fetchAllItems = (sort = "") => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items", { params: { sort } })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchBrand = (brand, sort = "") => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items/brand/" + brand, {
      params: { sort },
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchCategory = (cat, sort = "") => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items/category/" + cat, {
      params: { sort },
    })
    .then((res) => dispatch(setItems(res.data)));
};

export const fetchItem = (path) => (dispatch) => {
  return axios
    .get("http://localhost:8080/api/items/" + path)
    .then((res) => dispatch(setItem(res.data)));
};