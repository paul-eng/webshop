import React, { useEffect, useState } from "react";
import "../styles/CartItem.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/CartActions";

const CartItem = (props) => {
  const item = props.item;
  const { type, qty } = item.stock;

  function removeItem() {
    props.removeFromCart(item);
  }

  const [amt, setAmt] = useState(qty);

  useEffect(() => {
    setAmt(qty);
  }, [qty, props.error]);

  function getAmt(e) {
    setAmt(e.target.value);
  }

  return (
    <li className="CartItem">
      <Link to={"/" + item.pathname}>
        <img src={item.gallery[0]} alt="product thumbnail"></img>
      </Link>

      <article>
        <div>{`${item.brand} ${item.name}`}</div>
        <div>{type}</div>
        <div>{"$" + item.price}</div>
        <input
          type="number"
          min="1"
          value={amt}
          name={type}
          id={item.pathname}
          onChange={getAmt}
        />
      </article>
      <aside onClick={removeItem}>Remove</aside>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.cart.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
