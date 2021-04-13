import axios from "axios";

export const SET_BRANDS = "SET_BRANDS";
export const SET_CATEGORIES = "SET_CATEGORIES";

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

export const fetchBrands = () => (dispatch) => {
  axios.get("http://localhost:8080/api/items/brands").then((res) => {
    dispatch(setBrands(res.data));
  });
};

export const fetchCategories = () => (dispatch) => {
  axios.get("http://localhost:8080/api/items/categories").then((res) => {
    dispatch(setCategories(res.data));
  });
};
