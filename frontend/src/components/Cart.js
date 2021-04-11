import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";

const Cart = (props) => {
  let cartItems = props.items;

  if (cartItems.length < 1) {
    return "No Items";
  } else {
    // reverse so recently added items are at top of cart
    cartItems = [...cartItems].reverse().map((item) => <CartItem item={item} key={item._id} />);
  }

  return (
    <div className="cart">
      <ul>{cartItems}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(Cart);
