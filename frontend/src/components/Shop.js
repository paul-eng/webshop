import React, { Component } from "react";
import ShowItems from "./ShowItems";
import ItemInfo from "./ItemInfo";
import { connect } from "react-redux";
import Nav from "./Nav";
import "../styles/Shop.css";
import {
  fetchAllItems,
  fetchBrand,
  fetchCategory,
  fetchItem,
  clearItem,
  clearAllItems,
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
      case "/":
        this.props.fetchAllItems();
        this.props.clearItem();
        break;
      case "new-arrivals":
        this.props.fetchAllItems("-updated_date");
        this.props.clearItem();
        break;
      case "brand":
        this.props.fetchBrand(parsedParam);
        this.props.clearItem();
        break;
      case "category":
        this.props.fetchCategory(parsedParam);
        this.props.clearItem();
        break;
      default:
        this.props.fetchItem(url);
        this.props.clearAllItems();
        break;
    }
  }

  render() {
    let focus;

    if (Object.entries(this.props.itemInfo).length > 1) {
      focus = <ItemInfo />;
    } else {
      focus = <ShowItems />;
    }
    return (
      <div className="Shop">
        <Nav />
        {focus}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItems: (sort) => {
      dispatch(fetchAllItems(sort));
    },
    fetchItem: (path) => {
      dispatch(fetchItem(path));
    },
    fetchBrand: (brand) => {
      dispatch(fetchBrand(brand));
    },
    fetchCategory: (cat) => {
      dispatch(fetchCategory(cat));
    },
    clearAllItems: () => {
      dispatch(clearAllItems());
    },
    clearItem: () => {
      dispatch(clearItem());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
