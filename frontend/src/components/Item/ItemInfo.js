import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../../styles/ItemInfo.css";
import Slider from "./Slider";
import ItemControls from "./ItemControls";
import { useHistory } from "react-router-dom";

const ItemInfo = (props) => {
  let history = useHistory();
  const itemInfo = props.itemInfo;

  let page;

  page = itemInfo ? (
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
  ) : null;

  useEffect(() => {
    if (page === null) history.push("/");
  }, [page, history]);

  return page;
};

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

export default connect(mapStateToProps)(ItemInfo);
