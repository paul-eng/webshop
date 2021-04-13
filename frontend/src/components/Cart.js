import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";

const Cart = (props) => {
  let cartItems = props.items;

  function versionSplitter(item) {
    let versions = [];
    item.quantity.forEach((version) => {
      let separate = Object.assign({}, item, { quantity: version });
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
        <CartItem item={item} key={item.name + item.quantity[0]} />
      ));
  }

  return (
    <div className="cart">
      <ul>{cartItems}</ul>
      Subtotal: ${props.total}
      Tax: ${props.total * .08875}
      Total: ${props.total + props.total * .08875}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps)(Cart);
