import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";

import Header from "./components/Header";
import AddItem from "./components/AddItem";
import Cart from "./components/Cart";
import Shop from "./components/Shop";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/new-arrivals" component={Shop} />
          <Route exact path="/add-item" component={AddItem} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/brand/:brand" component={Shop} />
          <Route path="/category/:cat" component={Shop} />
          <Route path="/:item" component={Shop} />
        </Switch>
      </Router>
    );
  }
}

export default App;
