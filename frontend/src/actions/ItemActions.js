import axios from "axios";

export const SET_ITEMS = "SET_ITEMS";

export function setItems(items) {
  return {
    type: SET_ITEMS,
    payload: items
  }
}

export function fetchAllItems() {
  return function (dispatch) {
    axios.get("http://localhost:8080/api/items").then((res) => {
      dispatch(setItems(res.data));
    });
  };
}
