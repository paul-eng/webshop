import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin } from "../../actions/UserActions";
import "../../styles/Admin.css";

const Admin = () => {
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const sessionToken = localStorage.getItem("session");

  useEffect(() => {
    sessionToken
      ? dispatch(getAdmin(sessionToken)).then((admin) => {
          setVerified(admin);
        })
      : setVerified(false);
  }, [sessionToken, dispatch]);

  return verified ? (
    <aside className="Admin">
      <h2>Admin</h2>
      <Link to="/add-item">Add Item</Link>
    </aside>
  ) : null;
};

export default Admin;
