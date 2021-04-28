import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { queryStr } from "../util/Util";
import { withRouter } from "react-router-dom";

const Page = (props) => {
  let query = queryStr(props);
  const [active, setActive] = useState(query.p);
  const prevQuery = useRef({});
  const didMount = useRef(false);
  const pagesize = 6;
  const pageCount = Math.ceil(props.count / pagesize);

  useEffect(() => {
    setActive(query.p || 1);
  }, [query.p]);

  useEffect(() => {
    //  create ref similar to prevProps
    prevQuery.current = query;
  }, [query]);

  let { p, ...prevFilters } = prevQuery.current;
  let { p: p2, ...filters } = query;

  useEffect(() => {
    // basically componenetDidUpdate
    // if querystring changes for reason besides page change (ex. select diff filters), set to first page
    if (didMount.current) {
      if (JSON.stringify(prevFilters) !== JSON.stringify(filters)) {
        query.p = 1;
        updateQuery();
      }
    } else {
      didMount.current = true;
    }
  });

  let updateQuery = () => {
    props.history.push({
      search: queryString.stringify(query, { arrayFormat: "bracket" }),
    });
  };

  let setPage = (i) => {
    query.p = query.p ? parseInt(query.p) + i : 1 + i;
    updateQuery();
  };

  let jumpToPage = (i) => {
    query.p = i;
    updateQuery();
  };

  let pageList = () => {
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li
          key={`pg${i}`}
          id={i === parseInt(active) ? "active" : ""}
          onClick={() => jumpToPage(i)}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="Page">
      <ul>
        <li
          style={{ display: active <= 1 ? "none" : "block" }}
          onClick={() => setPage(-1)}
        >
          PREVIOUS
        </li>
        {pageCount === 1 ? "" : pageList()}
        <li
          style={{ display: active >= pageCount ? "none" : "block" }}
          onClick={() => setPage(1)}
        >
          NEXT
        </li>
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
