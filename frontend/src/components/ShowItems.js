import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Item from "./Item";
import {
  fetchAllItems,
  fetchBrand,
  fetchCategory,
} from "../actions/ItemActions";
import "../styles/ShowItems.css";

class ShowItems extends Component {
  componentDidMount() {
    let parsedURL = this.parseURL(this.props.match.url);
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
    let parsed = url.match(/(?<=\/)[^/]+/g);
    return parsed ? parsed : ["/"];
  }

  fetchItems(url) {
    switch (url[0]) {
      case "brand":
        let brand = url[1];
        this.props.fetchBrand(brand);
        break;
      case "category":
        let cat = url[1];
        console.log(cat)
        this.props.fetchCategory(cat);
        break
      default:
        this.props.fetchAllItems();
        break;
    }
  }

  render() {
    let itemList = this.props.itemList;

    if (itemList.length < 1) {
      itemList = "No items found";
    } else {
      itemList = itemList.map((item) => <Item item={item} key={item._id} />);
    }

    return (
      <div className="ShowItems">
        <h2>All Cameras</h2>
        {itemList}
        <br></br>
        <Link to="/add-item">Add A Camera</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemList: state.products.itemList,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ShowItems);
