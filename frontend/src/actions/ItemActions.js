import axios from "axios";

export const SET_ITEMS = "SET_ITEMS";
export const SET_ITEM = "SET_ITEM";

export function setItems(items) {
  return {
    type: SET_ITEMS,
    payload: items,
  };
}

export const setItem = (item) => {
  return {
    type: SET_ITEM,
    payload: item,
  };
};

export function fetchAllItems(sort = "") {
  return function (dispatch) {
    axios
      .get("http://localhost:8080/api/items", { params: { sort } })
      .then((res) => {
        dispatch(setItems(res.data));
      });
  };
}

export const fetchItem = (id) => (dispatch) => {
  axios.get("http://localhost:8080/api/items/" + id).then((res) => {
    dispatch(setItem(res.data));
  });
};
