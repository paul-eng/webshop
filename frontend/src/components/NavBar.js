import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = (props) => {
  return (
    <div className="NavBar">
      <Link to="/">
        <h1>Restful Goods</h1>
      </Link>

      <nav>
        <Link>Cart</Link>
      </nav>
    </div>
  );
};

export default NavBar;
