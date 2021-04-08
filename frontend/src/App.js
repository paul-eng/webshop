import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AddProduct from "./components/AddProduct";
import ShowProducts from "./components/ShowProducts";
import ProductDetails from "./components/ProductDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ShowProducts} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/product-info/:id" component={ProductDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
