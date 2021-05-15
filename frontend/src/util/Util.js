import queryString from "query-string";
import { login, logout } from "../actions/UserActions";
import { fetchCart, clearCart } from "../actions/CartActions";
import CartItem from "../components/Cart/CartItem";

export const makeQuery = (form, history) => {
  let terms = form.target[0].value.split(" ");
  let query = { q: terms };
  history.push({
    pathname: "/search/",
    search: queryString.stringify(query, { arrayFormat: "bracket" }),
  });
};

export const logoutService = (history, dispatch) => {
  dispatch(logout())
    .then(() => dispatch(clearCart()))
    .then(() => history.push("/account/logout"));
};

export const loginService = (user, history, dispatch) => {
  dispatch(login(user))
    .then((token) => dispatch(fetchCart(token)))
    .then((res) => {
      if (res) history.push("/account");
    });
};

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

export const stockTypes = (stock) => {
  return stock.map((opt) => opt.type);
};

export const stockQtys = (stock) => {
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
  return {
    // Find in files: SHAPEOFCARTSTATE. Won't necessarily break if a field is missing in one, but try to keep consistent for peace of mind
    count,
    total,
    items: itemsB,
    qtyError: source.qtyError
      ? target.qtyError.concat(source.qtyError)
      : target.qtyError,
  };
};

export const renderAdd = (address) => {
  return (
    <div>
      <h3>{address.firstname + " " + address.lastname}</h3>
      <h3>{address.company}</h3>
      <h3>{address.add1}</h3>
      <h3>{address.add2}</h3>
      <h3>
        {[address.city, address.state, address.postcode]
          .filter((x) => x !== "")
          .join(", ")}
      </h3>
      <h3>{address.country}</h3>
      <h3>{address.phone}</h3>
    </div>
  );
};

export const getLineItems = (items) => {
  let itemList = items.map((item) => {
    return item.stock.map(
      (version) =>
        `${version.qty}x ${item.brand + " " + item.name} - ${version.type}`
    );
  });
  return itemList.flat().join(", ");
};

export const genOrderNum = (total) => {
  const seed = parseInt(Date.now().toString().split("").reverse().join(""));
  const random = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return seed + total - random;
};

export const cartList = (items) => {
  function versionSplitter(item) {
    let versions = [];
    item.stock.forEach((version) => {
      let separate = Object.assign({}, item, {
        stock: { type: version.type, qty: version.qty },
      });
      versions.push(separate);
    });
    return versions;
  }
  let separateItems = [...items].map((item) => versionSplitter(item)).flat();
  // reverse so recently added items are at top of cart
  return separateItems
    .reverse()
    .map((item) => <CartItem item={item} key={item.name + item.stock.type} />);
};
