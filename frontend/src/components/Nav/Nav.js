import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Admin from "./Admin";
import { useSelector } from "react-redux";
import "../../styles/Nav.css";
import MobileSearch from "./MobileSearch";

const Nav = (props) => {
  const currentUser = useSelector((state) => state.user);
  const mobileDisplay = useSelector((state) => state.nav.display);
  const [focus, setFocus] = useState({ className: "" });
  const [path, setPath] = useState(null);
  const [list, setList] = useState(false);
  const [acct, setAcct] = useState(false);
  const prevFocus = useRef({ className: "" });
  const account = useRef();
  const error = useRef();
  const msg = useSelector((state) => state.nav.msg);

  function show(path, e) {
    setPath(path);
    setList(true);
    if (!mobileDisplay) setFocus(e.target);
  }

  function hide() {
    setList(false);
    setFocus({ className: "" });
  }

  function onClick() {
    setAcct(true);
    window.addEventListener("mousedown", handleDown);
  }

  useEffect(() => {
    error.current = msg;
  }, [msg]);

  useEffect(() => {
    setAcct(false);
    setList(false);
  }, [props.location]);

  function handleDown(e) {
    // listener points to error ref, pointing directly to error state would refer to stale state from time of listener creation
    if (
      !error.current &&
      account.current &&
      !account.current.contains(e.target)
    ) {
      setAcct(false);
      window.removeEventListener("mousedown", handleDown);
    }
  }

  useEffect(() => {
    focus.className = "TopLevel";
    // get prevState of focus to deactive class
    prevFocus.current = focus;
  }, [focus]);

  if (prevFocus) {
    prevFocus.current.className = "";
  }

  return (
    <nav className={mobileDisplay ? "Nav" : "Nav hidden"}>
      <Admin />
      {mobileDisplay ? <MobileSearch /> : null}
      <div
        className={acct ? "NavWrapper masked" : "NavWrapper"}
        onMouseLeave={mobileDisplay ? null : hide}
      >
        <h3 onMouseEnter={mobileDisplay ? null : hide}>
          <Link to="/new-arrivals">NEW ARRIVALS</Link>
        </h3>
        <h3
          onClick={mobileDisplay ? (e) => show("/brand/", e) : null}
          onMouseEnter={mobileDisplay ? null : (e) => show("/brand/", e)}
        >
          BRANDS
        </h3>
        <h3
          onClick={mobileDisplay ? (e) => show("/category/", e) : null}
          onMouseEnter={mobileDisplay ? null : (e) => show("/category/", e)}
        >
          CATEGORIES
        </h3>
        <NavList active={list} path={path} setList={setList} />
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
