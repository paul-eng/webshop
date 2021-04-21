import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = (props) => {
  return (
    <div className="Header">
      <Link to="/">
        <h1>Restful Goods</h1>
      </Link>

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
