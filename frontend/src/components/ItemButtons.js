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

  function stock(qty) {
    if (qty === 0) {
      return "(Out Of Stock)";
    } else if (qty === 1) {
      return "(Last One)";
    } else if (qty <= 3) {
      return "(Low Stock)";
    }
    return "";
  }

  function soldOut(inventory) {
    let sold = inventory.filter((option) => option[1] === 0);
    return sold.length === inventory.length;
  }

  function optionList(inventory) {
    return inventory.map((option) => {
      let version = option[0];
      let quantity = option[1];
      let outOfStock = quantity === 0;
      let msg = stock(quantity);

      return (
        <option disabled={outOfStock} key={version} value={version}>
          {`${version} ${msg}`}
        </option>
      );
    });
  }

  let render = <p>SOLD OUT</p>;

  if (inventory && !soldOut(inventory)) {
    let noOptions = inventory.length === 1;
    let options = optionList(inventory);
    render = (
      <form onSubmit={addToCart}>
        <select hidden={noOptions}>{options}</select>
        <input type="submit" value="Add To Cart" />
      </form>
    );
    console.log(inventory);
  }

  return <div className="ItemButtons">{render}</div>;
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
