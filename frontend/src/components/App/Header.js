import React from "react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleNav } from "../../actions/NavActions";
import cartSVG from "../../icons/cart.svg";
import menuSVG from "../../icons/menu.svg";
import plusSVG from "../../icons/plus.svg";
import "../../styles/Header.css";

const Header = (props) => {
  const location = useLocation();

  const onClick = () => {
    props.toggleNav();
  };

  const menuToggle = (
    <aside onClick={onClick}>
      <img
        style={{ display: props.mobileDisplay ? "none" : "block" }}
        src={menuSVG}
        alt="menu"
      />
      <img
        style={{ display: props.mobileDisplay ? "block" : "none" }}
        src={plusSVG}
        alt="menu"
      />
    </aside>
  );

  const back = (
    <aside>
      <Link to="/">
        <span>{"<"}</span>
      </Link>
    </aside>
  );
  return (
    <div className="Header">
      {location.pathname === "/cart" || location.pathname === "/checkout"
        ? back
        : menuToggle}
      <Link className="Logo" to="/">
        <h1>RESTFUL GOODS</h1>
      </Link>
      <SearchBar />
      <section>
        <Link to="/cart">
          {" "}
          <div>{props.count > 0 ? props.count : ""}</div>
          <img src={cartSVG} alt="cart" />
        </Link>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.cart.count,
    user: state.user,
    mobileDisplay: state.nav.display,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNav: (bool) => dispatch(toggleNav(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
