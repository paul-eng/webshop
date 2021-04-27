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
  let pagesize = 3;

  useEffect(() => {
    // basically creating prevProps
    prevQuery.current = query;
  }, [query]);

  let { p, ...prevFilters } = prevQuery.current;
  let { p: p2, ...filters } = query;

  useEffect(() => {
    // basically creating componenetDidUpdate
    // if querystring changes for a reason besides page change (ex. select diff filters), reset to first page
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

  let goToPage = (i) => {
    query.p = i;
    props.history.push({
      search: queryString.stringify(query, { arrayFormat: "bracket" }),
    });
  };

  let pages = (itemCount) => {
    let pageCount = Math.ceil(itemCount / pagesize);
    let links = [];

    for (let i = 1; i <= pageCount; i++) {
      links.push(<li onClick={() => goToPage(i)}>{i}</li>);
    }
    return links;
  };
  let pageList = pages(props.count);

  return (
    <div className="Page">
      <ul>
        <li style={{ color: disable }} onClick={func}>
          PREV
        </li>

        {pageList}

        <li onClick={() => setPage(1)}>NEXT</li>
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
