import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Product from "./Product";

class ShowProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  render() {
    const products = this.state.products;
    let productList;

    if (!products) {
      productList = "No products found";
    } else {
      productList = products.map((product) => (
        <Product product={product} key={product._id} />
      ));
    }

    return (
      <div className="ShowProducts">
        <h1>All Products</h1>
        {productList}
        <br></br>
        <Link to="/add-product">Add A Camera</Link>
      </div>
    );
  }
}

export default ShowProducts;
