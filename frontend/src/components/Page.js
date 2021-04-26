import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { queryStr } from "../util/Util";
import { withRouter } from "react-router-dom";

const Page = (props) => {
  let query = queryStr(props);
  const [page, updatePage] = useState(query.p);

  useEffect(() => {
    updatePage(query.p);
  }, [query.p]);

  function setPage(i) {
    if (query.p) {
      query.p = parseInt(query.p) + i;
    } else {
      query.p = i;
    }
    props.history.push({
      search: queryString.stringify(query, { arrayFormat: "bracket" }),
    });
  }

  let disable;
  let func;

  if (!page || page === "0") {
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
        <li>{page}</li>
      </ul>
    </div>
  );
};

export default withRouter(Page);
