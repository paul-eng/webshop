import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemButtons.css";

const ItemButtons = (props) => {
  let inventory = props.inventory;

  function addToCart(form) {
    form.preventDefault();
    let selected = form.target[0].value;
    props.addToCart(props.item, selected);
  }

  if (inventory) {
    inventory = inventory.map((option) => (
      <option key={option[0]} value={option[0]}>
        {option[0]}
      </option>
    ));
  }

  return (
    <div className="ItemButtons">
      <form onSubmit={addToCart}>
        <select>{inventory}</select>
        <input type="submit" value="Add To Cart" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    inventory: state.products.itemInfo.quantity,
    item: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, version) => {
      dispatch(addToCart(item, version));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemButtons);
