import React, { useEffect, useRef } from "react";
import queryString from "query-string";
import { queryStr } from "../util/Util";
import { withRouter } from "react-router-dom";

const FilterOption = (props) => {
  let query = queryStr(props);
  let weight = useRef("normal");

  useEffect(() => {
    let queries = Object.values(query).flat();
    if (queries.includes(props.value)) {
      weight.current = "bold";
    } else {
      weight.current = "normal";
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
      <div style={{ fontWeight: weight.current }}>{props.text}</div>
    </li>
  );
};

export default withRouter(FilterOption);
