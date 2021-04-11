import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";

import Header from "./components/Header";
import AddItem from "./components/AddItem";
import ItemInfo from "./components/ItemInfo";
import Cart from "./components/Cart";
import Shop from "./components/Shop";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route path="/brand/:brand" component={Shop} />
          <Route path="/category/:cat" component={Shop} />
          <Route path="/add-item" component={AddItem} />
          <Route path="/cart" component={Cart} />
          <Route path="/:item" component={ItemInfo} />
        </Switch>
      </Router>
    );
  }
}

export default App;
