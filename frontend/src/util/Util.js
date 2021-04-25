import queryString from "query-string";

export const queryStr = (props) => {
  return queryString.parse(props.location.search, {
    arrayFormat: "bracket",
  });
};

export const paramStr = (component) => {
  let params = component.props.match.params;

  for (let field in params) {
    params[field] = params[field].split("-").join(" ");
  }

  return params;
};

export const stockType = (stock) => {
  return stock.map((opt) => opt.type);
};

export const stockQty = (stock) => {
  return stock.map((opt) => opt.qty);
};

export const matchStock = (stock, type) => {
  return stock.find((v) => v.type === type);
};

export const matchItem = (items, id) => {
  return items.find((item) => item._id === id);
};
