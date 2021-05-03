import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { useSelector } from "react-redux";
import "../../styles/Nav.css";

const Nav = () => {
  function show(path, e) {
    setPath(path);
    setList(true);
    setFocus(e.target);
  }

  function hide() {
    setList(false);
    setFocus({ className: "" });
  }

  function onClick() {
    setAcct(true);
    window.addEventListener("mousedown", handleDown);
  }

  function handleDown(e) {
    // skip first click of account h3 to open tab
    if (account.current && !account.current.contains(e.target)) {
      setAcct(false);
      window.removeEventListener("mousedown", handleDown);
    }
  }

  const currentUser = useSelector((state) => state.user);
  const [focus, setFocus] = useState({ className: "" });
  const [path, setPath] = useState(null);
  const [list, setList] = useState(false);
  const [acct, setAcct] = useState(false);
  const prevFocus = useRef({ className: "" });
  const account = useRef();

  useEffect(() => {
    focus.className = "TopLevel";
    // get prevState of focus to deactive class
    prevFocus.current = focus;
  }, [focus]);

  if (prevFocus) {
    prevFocus.current.className = "";
  }

  return (
    <nav className="Nav">
      <div
        className={acct ? "NavWrapper masked" : "NavWrapper"}
        onMouseLeave={hide}
      >
        <h3 onMouseEnter={hide}>
          <Link to="/new-arrivals">NEW ARRIVALS</Link>
        </h3>

        <h3 onMouseEnter={(e) => show("/brand/", e)}>BRANDS</h3>

        <h3 onMouseEnter={(e) => show("/category/", e)}>CATEGORIES</h3>

        <button>
          <Link to="/add-item" onMouseEnter={hide}>
            Add A Camera
          </Link>
        </button>
        <NavList active={list} path={path} />
      </div>
      <section>
        {currentUser ? <Dashboard active={acct} ref={account}/> : <Login active={acct} ref={account} />}
        <span>
          <h3 className={acct ? "TopLevel" : ""} onClick={onClick}>
            Account
          </h3>
        </span>
      </section>
    </nav>
  );
};

export default Nav;
