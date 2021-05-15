import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AddItem from "./AddItem";
import Shop from "../Shop/Shop";
import Brand from "../Shop/Brand";
import New from "../Shop/New";
import Category from "../Shop/Category";
import Item from "../Item/Item";
import Search from "../Shop/Search";
import CreateAccount from "../Account/CreateAccount";
import Account from "../Account/Account";
import Logout from "../Account/Logout";
import Address from "../Account/Address";
import AddressForm from "../Account/AddressForm"
import Order from "../Account/Order"
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Nav from "../Nav/Nav";

import { toggleNav } from "../../actions/NavActions";

class NavFrame extends Component {
  componentDidUpdate(prevProps) {
    //  props.location includes unique key, guarantees mobile menu will close even if redirecting to same url
    if (this.props.mobileDisplay && prevProps.location !== this.props.location)
      this.props.toggleNav(false);
  }

  render() {
    return (
      <div className="NavFrame">
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/new-arrivals" component={New} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/account/create" component={CreateAccount} />
          <Route exact path="/account/logout" component={Logout} />
          <PrivateRoute exact path="/account/address/form" component={AddressForm} />
          <PrivateRoute exact path="/account/address" component={Address} />
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute path="/account/order/:id" component={Order} />          
          <AdminRoute exact path="/add-item" component={AddItem} />
          <Route path="/brand/:brand" component={Brand} />
          <Route path="/category/:cat" component={Category} />
          <Route path="/:item" component={Item} />
        </Switch>
        <Nav location={this.props.location} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mobileDisplay: state.nav.display,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNav: (bool) => dispatch(toggleNav(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavFrame);
