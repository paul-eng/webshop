import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemButtons.css";

const ItemButtons = (props) => {
  let inventory = props.inventory;
  let hidden;

  function addToCart(form) {
    form.preventDefault();
    let selected = form.target[0].value;
    props.addToCart(props.item, selected);
  }

  if (inventory) {
    inventory = inventory.map((option) => {
      let soldout = option[1] === 0 ? [true, " (Out Of Stock)"] : [false, ""];
      return (
        <option disabled={soldout[0]} key={option[0]} value={option[0]}>
          {option[0] + soldout[1]}
        </option>
      );
    });

    // still want the value even if only one option so render but hide
    hidden = inventory.length < 2;
  }

  return (
    <div className="ItemButtons">
      <form onSubmit={addToCart}>
        <select hidden={hidden}>{inventory}</select>
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
