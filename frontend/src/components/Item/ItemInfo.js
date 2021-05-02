import React from "react";
import { connect } from "react-redux";
import "../../styles/ItemInfo.css";
import Slider from "./Slider";
import ItemControls from "./ItemControls";

const ItemInfo = (props) => {
  const itemInfo = props.itemInfo;

  return (
    <div className="ItemInfo">
      <Slider gallery={itemInfo.gallery} />
      <section>
        <h2>{`${itemInfo.brand} ${itemInfo.name}`.toUpperCase()}</h2>
        <h3>${itemInfo.price}</h3>
        <h3>
          <p>{itemInfo.description}</p>
        </h3>
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
