import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin } from "../../actions/UserActions";

const AdminRoute = ({ user, component: Component, ...rest }) => {
  const [admin, setAdmin] = useState(false);
  const token = localStorage.getItem("session");

  useDispatch()(getAdmin(token)).then((res) => setAdmin(res));

  return (
    <Route
      {...rest}
      render={(props) => (admin ? <Component {...props} /> : null)}
    />
  );
};

export default AdminRoute;
