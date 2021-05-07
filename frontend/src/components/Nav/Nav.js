import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Admin from "./Admin";
import { useSelector } from "react-redux";
import "../../styles/Nav.css";

const Nav = (props) => {
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

  // listener points to ref, pointing directly to state would refer to stale state from time of listener creation
  let error = useRef();
  const msg = useSelector((state) => state.nav.msg);
  useEffect(() => {
    error.current = msg;
  }, [msg]);

  useEffect(() => setAcct(false), [props.location]);

  function handleDown(e) {
    if (
      !error.current &&
      account.current &&
      !account.current.contains(e.target)
    ) {
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
      <Admin />
      <div
        className={acct ? "NavWrapper masked" : "NavWrapper"}
        onMouseLeave={hide}
      >
        <h3 onMouseEnter={hide}>
          <Link to="/new-arrivals">NEW ARRIVALS</Link>
        </h3>
        <h3 onMouseEnter={(e) => show("/brand/", e)}>BRANDS</h3>
        <h3 onMouseEnter={(e) => show("/category/", e)}>CATEGORIES</h3>
        <NavList active={list} path={path} />
      </div>
      <section>
        {currentUser ? (
          <Dashboard active={acct} ref={account} />
        ) : (
          <Login active={acct} ref={account} />
        )}
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
