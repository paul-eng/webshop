import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/UserActions";
import { fetchCart, saveCart } from "../../actions/CartActions";
import "../../styles/App.css";
import Header from "./Header";
import NavFrame from "./NavFrame"
import Message from "./Message";


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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
