import axios from "axios";

export const SET_BRANDS = "SET_BRANDS";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_MSG = "SET_MSG";
export const CLEAR_MSG = "CLEAR_MSG";
export const TOGGLE_NAV = "TOGGLE_NAV";

export const toggleNav = (bool) => {
  return {
    type: TOGGLE_NAV,
    bool,
  };
};

export const setBrands = (brands) => {
  return {
    type: SET_BRANDS,
    brands,
  };
};

export const setCategories = (cats) => {
  return {
    type: SET_CATEGORIES,
    cats,
  };
};

export const clearMsg = () => {
  return {
    type: CLEAR_MSG,
  };
};

export const fetchBrands = () => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/brands")
    .then((res) => dispatch(setBrands(res.data)));
};

export const fetchCategories = () => (dispatch) => {
  return axios
    .get("https://restful-goods.herokuapp.com/api/items/categories")
    .then((res) => dispatch(setCategories(res.data)));
};
