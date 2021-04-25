import queryString from "query-string";

export const queryStr = (component) => {
  return queryString.parse(component.props.location.search, {
    arrayFormat: "bracket",
  });
};

export const paramStr = (component) => {
  let params = component.props.match.params;

  for (let field in params) {
    params[field] = params[field].split("-").join(" ");
  }

  return params;
};
