import React, { useEffect, useState } from "react";
import "../../styles/CartItem.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkQty, removeFromCart } from "../../actions/CartActions";

const CartItem = (props) => {
  const item = props.item;
  const { type, qty } = item.stock;
  const [amt, setAmt] = useState(qty);
  const [error, setError] = useState(null);

  function removeItem() {
    props.removeFromCart(item);
  }

  useEffect(() => {
    setAmt(qty);
  }, [qty, props.error]);

  useEffect(() => {
    props.checkQty(item).then((tooMany) => {
      tooMany ? setError("The requested qty is not available") : setError(null);
    });
  }, [item, props]);

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
      <aside onClick={removeItem}>X Remove</aside>
      <div style={{color:"red"}}>{error}</div>
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
    checkQty: (item) => dispatch(checkQty(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
