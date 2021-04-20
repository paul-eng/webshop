import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBrands, fetchCategories } from "../actions/NavActions";
import "../styles/NavList.css";

class NavList extends Component {
  componentDidMount() {
    this.props.fetchBrands();
    this.props.fetchCategories();
  }

  makeParam = (link) => link.toLowerCase().split(" ").join("-");

  links = (type, link) =>
    link.map((link) => (
      <li key={link}>
        <Link to={type + this.makeParam(link)}>{link}</Link>
      </li>
    ));

  render() {
    let active = this.props.active ? "block" : "none";
    
    switch (this.props.active) {
      case "Brands":
         active = this.links("/brand/", this.props.brands);
         break
      case "Categories":
         active = this.links("/category/", this.props.categories);
         break
      default:
        break;
    }

    return <ul style={{display: active}} className={"NavList"}>{"wggtasdfads"}</ul>;
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.nav.brands,
    categories: state.nav.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrands: () => {
      dispatch(fetchBrands());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
