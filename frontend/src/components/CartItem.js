import React from "react";
import "../styles/CartItem.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/CartActions";

const CartItem = (props) => {
  const item = props.item;
  const version = item.quantity[0];
  const quantity = item.quantity[1];

  function removeItem() {
    props.removeFromCart(item);
  }

  return (
    <li className="CartItem">
      <Link to={"/" + item.pathname}>
        <img src={item.gallery[0]} alt="product thumbnail"></img>
      </Link>

      <article>
        <div>{`${item.brand} ${item.name}`}</div>
        <div>{version}</div>
        <div>{"$" + item.price}</div>
        <div>{"x " + quantity}</div>
      </article>
      <button onClick={removeItem}>Remove</button>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
