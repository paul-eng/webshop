import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin } from "../../actions/UserActions";
import "../../styles/Admin.css";

const Admin = () => {
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mounted) {
      const sessionToken = localStorage.getItem("session");
      if (sessionToken)
        dispatch(getAdmin(sessionToken)).then((admin) => {
          if (admin) setVerified(true);
        });
      setMounted(true);
    }
  }, [mounted, dispatch]);

  return verified ? (
    <aside className="Admin">
      <h2>Admin</h2>
      <Link to="/add-item">Add Item</Link>
    </aside>
  ) : null;
};

export default Admin;
