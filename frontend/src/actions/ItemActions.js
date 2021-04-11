import axios from "axios";

export const SET_ITEMS = "SET_ITEMS";
export const SET_ITEM = "SET_ITEM";
export const CLEAR_ITEM = "CLEAR_ITEM";

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

export const setItem = (item) => {
  return {
    type: SET_ITEM,
    payload: item,
  };
};

export const clearItem = () => {
  return {
    type: CLEAR_ITEM,
  };
};

export const fetchAllItems = (sort = "") => (dispatch) => {
  axios
    .get("http://localhost:8080/api/items", { params: { sort } })
    .then((res) => {
      dispatch(setItems(res.data));
    });
};

export const fetchItem = (path) => (dispatch) => {
  axios.get("http://localhost:8080/api/items/" + path).then((res) => {
    dispatch(setItem(res.data));
  });
};
