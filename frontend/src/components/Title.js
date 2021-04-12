import React from "react";
import { useHistory } from "react-router-dom";

const Title = (props) => {
  let history = useHistory();
  let path = history.location.pathname;
  let parsedPath = path.match(/(?<=\/)[^/]+/g);
  parsedPath
    ? parsedPath[1]
      ? (parsedPath = parsedPath[1])
      : (parsedPath = parsedPath[0])
    : (parsedPath = "all");

    parsedPath = parsedPath.split('-').join(' ').toUpperCase();

  return (
    <div className="Title">
      <h2>{parsedPath}</h2>
    </div>
  );
};

export default Title;
