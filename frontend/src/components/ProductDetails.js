import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/products/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          product: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="productDetails">
        <Link to="/">Back to All</Link>
        <ul>
          <li>Brand: {this.state.product.brand}</li>
          <li>Name: {this.state.product.name}</li>
          <li>Class: {this.state.product.category}</li>
          <li>Price: {this.state.product.price}</li>
        </ul>
      </div>
    );
  }
}

export default ProductDetails;
