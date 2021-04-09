import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.css";

import NavBar from "./components/NavBar";
import AddItem from "./components/AddItem";
import ShowItems from "./components/ShowItems";
import ItemInfo from "./components/ItemInfo";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Route exact path="/" component={ShowItems} />
          <Route path="/add-item" component={AddItem} />
          <Route path="/item/:id" component={ItemInfo} />
        </div>
      </Router>
    );
  }
}

export default App;
