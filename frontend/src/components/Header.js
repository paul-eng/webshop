import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = (props) => {
  return (
    <div className="Header">
      <Link to="/">
        <h1>Restful Goods</h1>
      </Link>

      <section>
        <Link to="/cart">Cart</Link>
      </section>
    </div>
  );
};

export default Header;
