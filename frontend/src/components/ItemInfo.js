import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";

const ItemInfo = (props) => {
  function addToCart() {
    props.addToCart(props.itemInfo);
  }

  const itemInfo = props.itemInfo;
  return (
    <div className="ItemInfo">
      <Link to="/">Back to All</Link>
      <ul>
        <li>Brand: {itemInfo.brand}</li>
        <li>Name: {itemInfo.name}</li>
        <li>Class: {itemInfo.category}</li>
        <li>Price: {itemInfo.price}</li>
      </ul>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInfo);
