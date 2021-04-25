import React from "react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = (props) => {
  return (
    <div className="Header">
      <Link className="Logo" to="/">
        <h1>RESTFUL GOODS</h1>
      </Link>
      <SearchBar />
      <section>
        {props.count}
        <Link to="/cart">Cart</Link>
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
