import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/UserActions";
import "../../styles/App.css";
import Header from "./Header";
import AddItem from "./AddItem";
import Cart from "../Cart/Cart";
import Shop from "../Shop/Shop";
import Brand from "../Shop/Brand";
import New from "../Shop/New";
import Category from "../Shop/Category";
import Item from "../Item/Item";
import Search from "../Shop/Search";
import CreateAccount from "../Account/CreateAccount";
import Profile from "../Account/Profile";

class App extends Component {
  componentDidMount() {
    let sessionToken = localStorage.session || null;
    if (sessionToken) {
      this.props.getUser("marni");
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/new-arrivals" component={New} />
          <Route exact path="/add-item" component={AddItem} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/account/create" component={CreateAccount} />
          <Route path="/account" component={Profile} />
          <Route path="/search" component={Search} />
          <Route path="/brand/:brand" component={Brand} />
          <Route path="/category/:cat" component={Category} />
          <Route path="/:item" component={Item} />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token) => dispatch(getUser(token)),
  };
};

export default connect(null, mapDispatchToProps)(App);
