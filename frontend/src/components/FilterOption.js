import React, { useEffect, useRef } from "react";
import queryString from "query-string";
import { queryStr } from "../util/Util";
import { withRouter } from "react-router-dom";

const FilterOption = (props) => {
  let query = queryStr(props);
  let active = useRef("");

  useEffect(() => {
    // if user searches for a brand/category, query.q needs to be erased for this check or it will always trigger active
    let removeSearch = Object.assign({}, query, { q: "" });
    let queries = Object.values(removeSearch).flat();
    if (queries.includes(props.value)) {
      active.current = "active";
    } else {
      active.current = "";
    }
  }, [query, props.value]);

  function setFilter() {
    let { filter, value } = props;

    if (query[filter] && query[filter].includes(value)) {
      query[filter] = query[filter].filter((val) => val !== value);
    } else if (!query[filter] || filter === "sort") {
      query[filter] = [value];
    } else {
      query[filter].push(value);
    }

    props.history.push({
      search: queryString.stringify(query, { arrayFormat: "bracket" }),
    });
  }

  return (
    <li className="FilterOption" onClick={setFilter}>
      <div className={active.current}>{props.text}</div>
    </li>
  );
};

export default withRouter(FilterOption);
