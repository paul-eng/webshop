import React, { useEffect, useState, useRef } from "react";
import "../../styles/CartItem.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkQty,
  qtyError,
  clearError,
  removeFromCart,
} from "../../actions/CartActions";

const CartItem = (props) => {
  const item = props.item;
  const { type, qty } = item.stock;
  const [amt, setAmt] = useState(qty);
  const [error, setError] = useState(null);
  const prevQty = useRef(null);

  function removeItem() {
    props.clearError(item);
    props.removeFromCart(item);
  }

  useEffect(() => {
    setAmt(qty);
  }, [qty, props.msg]);

  useEffect(() => {
    prevQty.current = qty;
  });

  if (prevQty.current !== qty) {
    props.checkQty(item).then((tooMany) => {
      if (tooMany) {
        props.qtyError(item);
        setError("The requested qty is not available");
      } else {
        props.clearError(item);
        setError(null);
      }
    });
  }

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
        {/* this hidden div is shown on order summary/history via css */}
        <div id="hidden" style={{display:"none"}}>Qty {amt}</div>
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
      <aside onClick={removeItem}>X Remove</aside>
      <div style={{ color: "red" }}>{error}</div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    msg: state.nav.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    checkQty: (item) => dispatch(checkQty(item)),
    qtyError: (item) => dispatch(qtyError(item)),
    clearError: (item) => dispatch(clearError(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
