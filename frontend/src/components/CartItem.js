import React, { useState } from "react";
import "../styles/CartItem.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/CartActions";

const CartItem = (props) => {
  const item = props.item;
  const [version, quantity] = item.quantity;

  function removeItem() {
    props.removeFromCart(item);
  }

  const [qty, setQty] = useState(quantity);

  function getQty(e) {
    setQty(e.target.value);
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
        <input type="number" min="0" value={qty} onChange={getQty} />
      </article>
      <aside onClick={removeItem}>Remove</aside>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
