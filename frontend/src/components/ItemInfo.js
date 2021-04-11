import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItem, clearItem } from "../actions/ItemActions";
import { addToCart } from "../actions/CartActions";

class ItemInfo extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const path = this.props.match.params.item;
    this.props.fetchItem(path);
  }

  componentWillUnmount() {
    this.props.clearItem();
  }

  addToCart() {
    this.props.addToCart(this.props.itemInfo);
  }

  render() {
    const itemInfo = this.props.itemInfo;
    return (
      <div className="ItemInfo">
        <Link to="/">Back to All</Link>
        <ul>
          <li>Brand: {itemInfo.brand}</li>
          <li>Name: {itemInfo.name}</li>
          <li>Class: {itemInfo.category}</li>
          <li>Price: {itemInfo.price}</li>
        </ul>
        <button onClick={this.addToCart}>Add To Cart</button>
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
    fetchItem: (path) => {
      dispatch(fetchItem(path));
    },
    clearItem: () => {
      dispatch(clearItem());
    },
    addToCart: (item) => {
      dispatch(addToCart(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInfo);
