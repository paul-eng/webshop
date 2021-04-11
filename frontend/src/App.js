import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";

import NavBar from "./components/NavBar";
import AddItem from "./components/AddItem";
import ShowItems from "./components/ShowItems";
import ItemInfo from "./components/ItemInfo";
import Cart from "./components/Cart";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ShowItems} />
          <Route path="/add-item" component={AddItem} />
          <Route path="/cart" component={Cart} />
          <Route path="/:item" component={ItemInfo} />
        </Switch>
      </Router>
    );
  }
}

export default App;
