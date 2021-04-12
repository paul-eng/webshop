import React, { Component } from "react";
import ShowItems from "./ShowItems";
import { connect } from "react-redux";
import Nav from "./Nav";
import "../styles/Shop.css";
import {
  fetchAllItems,
  fetchBrand,
  fetchCategory,
} from "../actions/ItemActions";
// import Footer from "./Footer";

class Shop extends Component {
  componentDidMount() {
    let parsedURL = this.parseURL(this.props.location.pathname);
    this.fetchItems(parsedURL);

    // check if route changes and need to render diff set of items
    this.unlisten = this.props.history.listen((location, action) => {
      parsedURL = this.parseURL(location.pathname);
      this.fetchItems(parsedURL);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  parseURL(url) {
    // "/brand/yashica" becomes ["brand","yashica"]
    let parsed = url.match(/(?<=\/)[^/]+/g);
    return parsed ? parsed : ["/"];
  }

  fetchItems(url) {
    // "zone-focus" becomes "zone focus"
    let param = url[1] || "";
    let parsedParam = param.split("-").join(" ");

    switch (url[0]) {
      case "brand":
        this.props.fetchBrand(parsedParam);
        break;
      case "category":
        this.props.fetchCategory(parsedParam);
        break;
      default:
        this.props.fetchAllItems();
        break;
    }
  }

  render() {
    return (
      <div className="Shop">
        <Nav />
        <ShowItems />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItems: (sort) => {
      dispatch(fetchAllItems(sort));
    },
    fetchBrand: (brand) => {
      dispatch(fetchBrand(brand));
    },
    fetchCategory: (cat) => {
      dispatch(fetchCategory(cat));
    },
  };
};

export default connect(null, mapDispatchToProps)(Shop);
