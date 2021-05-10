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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import { toggleNav } from "../../actions/NavActions";

class NavFrame extends Component {
  constructor(props) {
    super(props);
    this.state = { hidenav: false };
  }

  componentDidMount() {
    if (this.props.location.pathname === "/cart")
      this.setState({ hidenav: true });
  }

  componentDidUpdate(prevProps) {
    let location = this.props.location.pathname;
    if (prevProps.location.pathname !== location) {
      location === "/cart"
        ? this.setState({ hidenav: true })
        : this.setState({ hidenav: false });
    }
    //  props.location includes unique key, guarantees mobile menu will close even if redirecting to same url
    if (this.props.mobileDisplay && prevProps.location !== this.props.location)
      this.props.toggleNav(false);
  }

  render() {
    let hidenav = this.state.hidenav;
    return (
      <div className={hidenav ? "NavFrame hidenav" : "NavFrame"}>
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/" component={Shop} />
          <Route exact path="/new-arrivals" component={New} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/account/create" component={CreateAccount} />
          <Route exact path="/account/logout" component={Logout} />
          <PrivateRoute path="/account/address" component={Address} />
          <PrivateRoute path="/account" component={Account} />
          <AdminRoute exact path="/add-item" component={AddItem} />
          <Route path="/brand/:brand" component={Brand} />
          <Route path="/category/:cat" component={Category} />
          <Route path="/:item" component={Item} />
        </Switch>
        <Nav hidenav={hidenav} location={this.props.location} />
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
