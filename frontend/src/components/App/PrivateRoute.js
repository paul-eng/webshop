import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  const sessionToken = localStorage.getItem("session");
  return (
    <Route
      {...rest}
      render={(props) => {
        return sessionToken ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
