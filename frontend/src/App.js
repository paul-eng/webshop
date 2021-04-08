import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.css";

import NavBar from "./components/NavBar";
import AddProduct from "./components/AddProduct";
import ShowProducts from "./components/ShowProducts";
import ProductInfo from "./components/ProductInfo";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Route exact path="/" component={ShowProducts} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/product-info/:id" component={ProductInfo} />
        </div>
      </Router>
    );
  }
}

export default App;
