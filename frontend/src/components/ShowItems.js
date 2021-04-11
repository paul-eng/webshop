import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Item from "./Item";
import "../styles/ShowItems.css";

const ShowItems = (props) => {
  let itemList = props.itemList;

  if (itemList.length < 1) {
    itemList = "No items found";
  } else {
    itemList = itemList.map((item) => <Item item={item} key={item._id} />);
  }

  return (
    <div className="ShowItems">
      <h2>All Cameras</h2>
      {itemList}
      <br></br>
      <Link to="/add-item">Add A Camera</Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    itemList: state.products.itemList,
  };
};

export default connect(mapStateToProps)(ShowItems);
