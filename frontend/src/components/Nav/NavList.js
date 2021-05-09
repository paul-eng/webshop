import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBrands, fetchCategories } from "../../actions/NavActions";

class NavList extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [], active: false };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchBrands();
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active)
      this.setState({ active: this.props.active });

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
  }

  onClick() {
    this.setState({ active: false });
  }

  makeParam = (link) => link.toLowerCase().split(" ").join("-");

  list = (path, links) =>
    links.map((link) => (
      <li key={link}>
        <h3>
          <Link onClick={this.onClick} to={path + this.makeParam(link)}>
            {link}
          </Link>
        </h3>
      </li>
    ));

  render() {
    let active = this.state.active ? "block" : "none";
    let path = this.props.path;
    let links = this.state.links;

    return (
      <ul style={{ display: active }} className="NavList">
        {this.list(path, links)}
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
