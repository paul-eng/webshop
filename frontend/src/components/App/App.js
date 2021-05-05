import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/UserActions";
import { fetchCart, saveCart } from "../../actions/CartActions";
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
import Account from "../Account/Account";
import Logout from "../Account/Logout";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    let sessionToken = localStorage.getItem("session");
    if (sessionToken) {
      this.props
        .getUser(sessionToken)
        .then((token) => this.props.fetchCart(token));
    }
  }

  componentDidUpdate(prevProps) {
    let sessionToken = localStorage.getItem("session");
    if (sessionToken) {
      if (prevProps.cart !== this.props.cart) this.props.saveCart(sessionToken);
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
          <PrivateRoute exact path="/account/logout" component={Logout} />
          <PrivateRoute path="/account" component={Account} />
          <Route path="/search" component={Search} />
          <Route path="/brand/:brand" component={Brand} />
          <Route path="/category/:cat" component={Category} />
          <Route path="/:item" component={Item} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token) => dispatch(getUser(token)),
    fetchCart: (token) => dispatch(fetchCart(token)),
    saveCart: (token) => dispatch(saveCart(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
