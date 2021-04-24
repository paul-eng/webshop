import React, { useEffect, useRef } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

const FilterOption = (props) => {
  let query = queryString.parse(props.location.search);
  let weight = useRef("normal");

  useEffect(() => {
    let queries = Object.values(query);
    if (queries.includes(props.value)) {
      weight.current = "bold";
    } else {
      weight.current = "normal";
    }
  }, [query, props.value]);

  function setFilter() {
    let { filter, value } = props;

    if (query[filter] === value) {
      delete query[filter];
    } else {
      let add = {};
      add[filter] = value;
      query = { ...query, ...add };
    }
    props.history.push({ search: queryString.stringify(query) });
  }

  return (
    <li className="FilterOption" onClick={setFilter}>
      <div style={{ fontWeight: weight.current }}>{props.text}</div>
    </li>
  );
};

export default withRouter(FilterOption);
