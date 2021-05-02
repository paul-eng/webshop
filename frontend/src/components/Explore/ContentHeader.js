import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Filter from "./Filter";
import { queryStr } from "../../util/Util";
import "../../styles/ContentHeader.css"

const ContentHeader = (props) => {
  let history = useHistory();
  let params = history.location.pathname.match(/(?<=\/)[^/]+/g) || "no params";

  let title =
    params.length === 2
      ? params[1]
      : params[0] === "new-arrivals"
      ? params[0]
      : params[0] === "search"
      ? `search results for: '${queryStr(history).q.join(" ")}' (${
          props.count
        } found)`
      : params.length === 1
      ? ""
      : "all";

  title = title.toUpperCase().split("-").join(" ");

  return (
    <div className="ContentHeader">
      <Filter />
      <h3>{title}</h3>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    count: state.products.count,
    // connect to trigger rerender if items update without unmounting component ex. going from brand/:a to brand/:b
    itemList: state.products.itemList,
  };
};

export default connect(mapStateToProps)(ContentHeader);
