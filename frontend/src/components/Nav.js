import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavSection from "./NavSection";
import { fetchBrands, fetchCategories } from "../actions/NavActions";

class Nav extends Component {
  componentDidMount() {
    this.props.fetchBrands();
    this.props.fetchCategories();
  }

  makeURL = (param) => param.toLowerCase().split(" ").join("-");

  links = (params, type) =>
    params.map((param) => (
      <li key={param}>
        <Link to={type + this.makeURL(param)}>{param}</Link>
      </li>
    ));

  render() {
    let brands = this.links(this.props.brands, "/brand/");
    let cats = this.links(this.props.categories, "/category/");

    return (
      <nav className="Nav">
        <Link to="/new-arrivals">
          <button>
            <h3>New Arrivals</h3>
          </button>
        </Link>
        <NavSection title={"Brands"} links={brands} />
        <NavSection title={"Categories"} links={cats} />

        <Link to="/add-item">Add A Camera</Link>
      </nav>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
