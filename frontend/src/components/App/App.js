import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/UserActions";
import {
  fetchCart,
  saveCart,
  saveGuest,
  fetchGuest,
} from "../../actions/CartActions";
import "../../styles/App.css";
import Header from "./Header";
import NavFrame from "./NavFrame";
import Message from "./Message";
import Cart from "../Cart/Cart";
import Checkout from "../Cart/Checkout";
import Summary from "../Cart/Summary"

class App extends Component {
  componentDidMount() {
    let sessionToken = localStorage.getItem("session");
    if (sessionToken) {
      this.props
        .getUser(sessionToken)
        .then((token) => this.props.fetchCart(token));
    } else {
      let guestCart = localStorage.getItem("guestCart");
      if (guestCart) {
        this.props.fetchGuest(guestCart);
      } else {
        this.props.saveGuest();
      }
    }
  }

  componentDidUpdate(prevProps) {
    let sessionToken = localStorage.getItem("session");
    let guestCart = localStorage.getItem("guestCart");

    if (prevProps.cart !== this.props.cart) {
      if (sessionToken) {
        this.props.saveCart(sessionToken);
      } else if (guestCart) {
        this.props.saveGuest();
      }
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/checkout/summary" component={Summary} />
          <Route path="/" component={NavFrame} />
        </Switch>
        <Message />
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
    fetchGuest: (cartToken) => dispatch(fetchGuest(cartToken)),
    saveGuest: () => dispatch(saveGuest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
