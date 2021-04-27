import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { queryStr } from "../util/Util";
import { withRouter } from "react-router-dom";

const Page = (props) => {
  let query = queryStr(props);
  const [page, updatePage] = useState(query.p);
  let prevQuery = useRef({});
  let didMount = useRef(false);

  useEffect(() => {
    // basically creating prevProps
    prevQuery.current = query;
  }, [query]);
  
  let { p, ...prevFilters } = prevQuery.current;
  let { p: p2, ...filters } = query;
  

  useEffect(() => {
    // basically creating componenetDidUpdate
    if (didMount.current) {
      if (JSON.stringify(prevFilters) !== JSON.stringify(filters)) {
        query.p = 1;
        props.history.push({
          search: queryString.stringify(query, { arrayFormat: "bracket" }),
        });
      }
    } else {
      didMount.current = true;
    }
  });

  useEffect(() => {
    updatePage(query.p);
  }, [query.p]);

  function setPage(i) {
    if (query.p) {
      query.p = parseInt(query.p) + i;
    } else {
      query.p = 1 + i;
    }
    props.history.push({
      search: queryString.stringify(query, { arrayFormat: "bracket" }),
    });
  }

  let disable;
  let func;

  if (!page || page <= "1") {
    disable = "red";
    func = () => setPage(0);
  } else {
    disable = "green";
    func = () => setPage(-1);
  }

  return (
    <div className="Page">
      <ul>
        <li style={{ color: disable }} onClick={func}>
          PREV
        </li>
        <li onClick={() => setPage(1)}>NEXT</li>
        <li>{props.count}</li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.products.count,
  };
};

export default withRouter(connect(mapStateToProps)(Page));
