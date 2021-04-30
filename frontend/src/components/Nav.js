import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import "../styles/Nav.css";

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
        <h3 onMouseEnter={hide}>
          <Link to="/new-arrivals">NEW ARRIVALS</Link>
        </h3>

        <h3 onMouseEnter={() => show("/brand/")}>BRANDS</h3>

        <h3 onMouseEnter={() => show("/category/")}>CATEGORIES</h3>

        <button>
          <Link to="/add-item" onMouseEnter={hide}>
            Add A Camera
          </Link>
        </button>
        <NavList active={active} path={activePath} />
      </div>
    </nav>
  );
};

export default Nav;
