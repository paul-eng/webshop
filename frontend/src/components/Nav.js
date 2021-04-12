import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBrands, fetchCategories } from "../actions/NavActions";

class Nav extends Component {
  componentDidMount() {
    this.props.fetchBrands();
    this.props.fetchCategories();
  }

  pathMaker = (param) => param.toLowerCase().split(" ").join("-");

  linkMaker = (params, type) =>
    params.map((param) => (
      <li>
        <Link to={type + this.pathMaker(param)}>{param}</Link>
      </li>
    ));

  render() {
    let brands = this.props.brands;
    let cats = this.props.categories;

    brands = this.linkMaker(brands, "/brand/");
    cats = this.linkMaker(cats, "/category/");

    return (
      <div className="Nav">
        <ul>
          Brands
          {brands}
        </ul>
        <ul>
          Categories
          {cats}
        </ul>

        <Link to="/add-item">Add A Camera</Link>
      </div>
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
