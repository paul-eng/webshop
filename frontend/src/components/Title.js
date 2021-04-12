import React from "react";
import { useHistory } from "react-router-dom";

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

  title = title.toUpperCase().split("-").join(" ")

  return (
    <div className="Title">
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
