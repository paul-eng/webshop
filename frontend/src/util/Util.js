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

export const mergeCarts = (target, source) => {
  let count = target.count;
  let total = target.total;
  let itemsA = source.items;
  let itemsB = target.items;

  let findsum = (stock) => {
    return stock.reduce((acc, val) => acc + val.qty, 0);
  };

  itemsA.forEach((item) => {
    let match = itemsB.find((i) => i.name === item.name);

    if (!match) {
      itemsB.push(item);
      let qty = findsum(item.stock);
      count = count + qty;
      total = total + qty * item.price;
    } else {
      item.stock.forEach((version) => {
        let vermatch = match.stock.find((v) => v.type === version.type);
        if (!vermatch) {
          match.stock.push(version);
        } else {
          vermatch.qty = vermatch.qty + version.qty;
        }
        count = count + version.qty;
        total = total + version.qty * item.price;
      });
    }
  });
  return { count, total, items: itemsB };
};
