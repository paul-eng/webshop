import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Filter from "./Filter"

const Title = (props) => {
  let history = useHistory();
  let params = history.location.pathname.match(/(?<=\/)[^/]+/g) || "no params";

  let title =
    params.length === 2
      ? params[1]
      : params[0] === "new-arrivals"
      ? params[0]
      : params.length === 1
      ? ""
      : "all";

  title = title.toUpperCase().split("-").join(" ");

  return (
    <div className="Title">
      <h3>{title}</h3>
      <Filter />
    </div>
  );
};

// connect to trigger rerender if items update without unmounting component ex. going from brand/:a to brand/:b

const mapStateToProps = (state) => {
  return {
    itemList: state.products.itemList,
  };
};

export default connect(mapStateToProps)(Title);
