import React from "react";
import { connect } from "react-redux";
import "../styles/ItemInfo.css";
import ItemControls from "./ItemControls";

const ItemInfo = (props) => {
  const itemInfo = props.itemInfo;

  let tempimg = itemInfo.gallery || "";

  return (
    <div className="ItemInfo">
      <img alt="temp" src={tempimg[0]}></img>
      <section>
        <h2>{itemInfo.brand + " " + itemInfo.name}</h2>
        <h3>${itemInfo.price}</h3>
        <h4>{itemInfo.description}</h4>
        <ItemControls />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

export default connect(mapStateToProps)(ItemInfo);
