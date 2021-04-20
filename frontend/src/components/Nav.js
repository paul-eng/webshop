import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";

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
        <button>
          <Link to="/new-arrivals">
            <h3>New Arrivals</h3>
          </Link>
        </button>
        <button onMouseEnter={() => show("/brand/")}>
          <h3>Brands</h3>
        </button>
        <button onMouseEnter={() => show("/category/")}>
          <h3>Categories</h3>
        </button>
        <button>
          <Link to="/add-item">Add A Camera</Link>
        </button>
        <NavList active={active} path={activePath} />
      </div>
    </nav>
  );
};

export default Nav;
