import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import "../styles/Nav.css"

const Nav = () => {
  function show(path) {
    setPath(path);
    setActive(true);
  }

  function hide() {
    setActive(false);
  }

  const [activePath, setPath] = useState(null);
  const [active, setActive] = useState(false);

  return (
    <nav className="Nav">
      <div className="NavWrapper" onMouseLeave={hide}>
          <Link to="/new-arrivals">
        <button onMouseEnter={hide}>
            <h3>NEW ARRIVALS</h3>
        </button>
          </Link>
        <button onMouseEnter={() => show("/brand/")}>
          <h3>BRANDS</h3>
        </button>
        <button onMouseEnter={() => show("/category/")}>
          <h3>CATEGORIES</h3>
        </button>
      <button onMouseEnter={hide}>
        <Link to="/add-item">Add A Camera</Link>
      </button>
        <NavList active={active} path={activePath} />
      </div>
    </nav>
  );
};

export default Nav;
