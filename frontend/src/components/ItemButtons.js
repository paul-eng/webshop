import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";

const ItemButtons = (props) => {
  let selected = "";
  let inventory = props.inventory;

  function getValue(e) {
    selected = e.target.value;
  }

  function addToCart() {
    // props.addToCart(props.itemInfo);
    console.log(selected);
  }

  if (inventory) {
    selected = inventory[0][0];
    inventory = inventory.map((option) => (
      <option key={option[0]} value={option[0]}>
        {option[0]}
      </option>
    ));
  }

  return (
    <div className="ItemButtons">
      <select onChange={getValue}>{inventory}</select>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    inventory: state.products.itemInfo.quantity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemButtons);
