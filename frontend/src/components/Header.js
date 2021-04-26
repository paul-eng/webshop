import React from "react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cartSVG from "../icons/cart.svg";
import "../styles/Header.css";

const Header = (props) => {
  return (
    <div className="Header">
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
  };
};

export default connect(mapStateToProps)(Header);
