import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { updateCart } from "../actions/CartActions";
import "../styles/Cart.css";

const Cart = (props) => {
  let cartItems = props.items;

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

  if (cartItems.length < 1) {
    return "Your cart is empty";
  } else {
    let separateItems = [...cartItems]
      .map((item) => versionSplitter(item))
      .flat();
    // reverse so recently added items are at top of cart
    cartItems = separateItems
      .reverse()
      .map((item) => (
        <CartItem item={item} key={item.name + item.stock.type} />
      ));
  }

  function updateQty(form) {
    form.preventDefault();
    // don't need the last form value (submit button)
    let updates = Object.values(form.target.elements).slice(0, -1);

    props.updateCart(updates);
  }

  return (
    <div className="Cart">
      <form onSubmit={updateQty}>
      <h3>CART</h3>
        <ul>{cartItems}</ul>
        <input type="submit" value="UPDATE CART" />
      </form>
      <section>
        <div>Subtotal: ${props.total.toFixed(2)}</div>
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (updates) =>
      dispatch(updateCart(updates)),
  };
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    total: state.cart.total,
    error: state.cart.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
