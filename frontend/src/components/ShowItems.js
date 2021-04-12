import React from "react";
import { connect } from "react-redux";
import Product from "./Product";
import Title from "./Title";
import "../styles/ShowItems.css";

const ShowItems = (props) => {
  let itemList = props.itemList;
  itemList = itemList.map((item) => <Product item={item} key={item._id} />);
  return (
    <div className="ShowItems">
      <Title />
      {itemList}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    itemList: state.products.itemList,
  };
};

export default connect(mapStateToProps)(ShowItems);
