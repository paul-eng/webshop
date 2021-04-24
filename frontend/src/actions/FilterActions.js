export const SET_FILTERS = "SET_FILTERS";

function getUnique(filter, arr, item) {
  if (!arr.includes(item[filter])) {
    arr.push(item[filter]);
  }
  return arr;
}

export const setFilters = (brand, category) => {
  return {
    type: SET_FILTERS,
    brand,
    category,
  };
};

export const getFilters = () => (dispatch, getState) => {
  let brands = [];
  let cats = [];
  getState().products.itemList.forEach((item) => {
    brands = getUnique("brand", brands, item);
    cats = getUnique("category", cats, item);
  });
//   sort to alphabetize
  dispatch(setFilters(brands.sort(), cats.sort()));
};
