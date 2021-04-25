import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";

import Header from "./components/Header";
import AddItem from "./components/AddItem";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import Brand from "./components/Brand";
import New from "./components/New";
import Category from "./components/Category";
import Item from "./components/Item";
import Search from "./components/SearchBar";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/new-arrivals" component={New} />
          <Route exact path="/add-item" component={AddItem} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/brand/:brand" component={Brand} />
          <Route path="/category/:cat" component={Category} />
          <Route path="/search" component={Search} />
          <Route path="/:item" component={Item} />
        </Switch>
      </Router>
    );
  }
}

export default App;
