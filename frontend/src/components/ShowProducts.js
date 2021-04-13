import React from "react";
import { connect } from "react-redux";
import Product from "./Product";
import "../styles/ShowProducts.css";

const ShowProducts = (props) => {
  let itemList = props.itemList;
  itemList = itemList.map((item) => <Product item={item} key={item._id} />);
  return (
    <div className="ShowProducts">
      {itemList}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    itemList: state.products.itemList,
  };
};

export default connect(mapStateToProps)(ShowProducts);
