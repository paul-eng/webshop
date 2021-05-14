import React, { Component } from "react";
import { connect } from "react-redux";
import Shipping from "./Shipping.js";
import Payment from "./Payment.js";
import ViewItems from "./ViewItems.js";
import { renderAdd } from "../../util/Util";
import "../../styles/_Checkout.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipcost: undefined,
      shipinfo: undefined,
      showpay: false,
    };
    this.getshipcost = this.getshipcost.bind(this);
    this.getshipinfo = this.getshipinfo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getshipcost(e) {
    this.setState({ shipcost: parseInt(e.target.value) });
  }

  getshipinfo(info) {
    this.setState({ shipinfo: info, showpay: true });
  }

  goBack() {
    this.setState({ showpay: false });

  }

  render() {
    let shipcost = this.state.shipcost;
    let shipinfo = this.state.shipinfo;
    let showpay = this.state.showpay;
    let total = this.props.total;
    return (
      <div className="Checkout2">
        <span>
          <h3
            onClick={this.goBack}
            style={{ color: showpay ? "#aaa" : "black" }}
          >
            1. SHIPPING
          </h3>
          <h3 style={{ color: showpay ? "black" : "#aaa" }}>
            2. REVIEW & PAYMENT
          </h3>
        </span>
        {this.state.showpay ? <Payment /> :  <Shipping
          user={this.props.user}
          getshipcost={this.getshipcost}
          getshipinfo={this.getshipinfo}
          oldstate={shipinfo}
        /> }
       
       
        <section>
          <h3>Order summary</h3>
          <aside>
            <ul>
              <li>Subtotal:</li>
              <li>Shipping: </li>
              <li>Total:</li>
            </ul>
            <ul>
              <li>${total.toFixed(2)}</li>
              <li>
                {shipcost ? "$" + shipcost.toFixed(2) : "Not yet calculated"}
              </li>
              <li>
                {shipcost
                  ? `$${(total + shipcost).toFixed(2)}`
                  : "Not yet calculated"}
              </li>
            </ul>
          </aside>
          <ViewItems />
          {shipinfo ? renderAdd(shipinfo) : null}
          {shipinfo ? (
            <div>
              <h3>Shipping method</h3>
              <h3>{shipinfo.method}</h3>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    total: state.cart.total,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
