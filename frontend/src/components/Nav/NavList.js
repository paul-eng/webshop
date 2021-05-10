import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBrands, fetchCategories } from "../../actions/NavActions";

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
      let links;
      switch (this.props.path) {
        case "/brand/":
          links = this.props.brands;
          break;
        case "/category/":
          links = this.props.categories;
          break;
        default:
          break;
      }
      this.setState({ links: links });
    }

    if (prevProps.mobileDisplay !== this.props.mobileDisplay) {
      if (!this.props.mobileDisplay) this.props.setList(false);
    }
  }

  makeParam = (link) => link.toLowerCase().split(" ").join("-");

  list = (path, links) =>
    links.map((link) => (
      <li key={link}>
        <h3>
          <Link to={path + this.makeParam(link)}>{link}</Link>
        </h3>
      </li>
    ));

  render() {
    let active = this.props.active ? "block" : "none";
    let path = this.props.path;
    let links = this.state.links;

    return (
      <ul style={{ display: active }} className="NavList">
        <h3 onClick={()=>this.props.setList(false)} style={{display: "none"}}>
          {"<"}</h3>
        {this.list(path, links)}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.nav.brands,
    categories: state.nav.categories,
    mobileDisplay: state.nav.display,
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
