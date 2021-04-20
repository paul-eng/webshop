import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBrands, fetchCategories } from "../actions/NavActions";
import "../styles/NavList.css";

class NavList extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  componentDidMount() {
    this.props.fetchBrands();
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      switch (this.props.path) {
        case "/brand/":
          this.setState({ links: this.props.brands });
          break;
        case "/category/":
          this.setState({ links: this.props.categories });
          break;
        default:
          break;
      }
      console.log(this.state.links);
    }
  }

  makeParam = (link) => link.toLowerCase().split(" ").join("-");

  links = (path, links) =>
    links.map((link) => (
      <li key={link}>
        <Link to={path + this.makeParam(link)}>{link}</Link>
      </li>
    ));

  render() {
    let active = this.props.active ? "block" : "none";
    let path = this.props.path;
    let links = this.state.links;

    return (
      <ul style={{ display: active }} className={"NavList"}>
        {this.links(path, links)}
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
