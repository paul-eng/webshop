import React, { Component } from "react";
import { connect } from "react-redux";
import Shipping from "./Shipping.js";
import Payment from "./Payment.js";
import ViewItems from "./ViewItems.js";
import { renderAdd } from "../../util/Util";
import "../../styles/Checkout.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipfee: undefined,
      shipinfo: undefined,
      showpay: false,
    };
    this.getshipfee = this.getshipfee.bind(this);
    this.getshipinfo = this.getshipinfo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getshipfee(e) {
    this.setState({ shipfee: parseInt(e.target.value) });
  }

  getshipinfo(info) {
    this.setState({ shipinfo: info, showpay: true });
  }

  goBack() {
    this.setState({ showpay: false });
  }

  render() {
    let shipfee = this.state.shipfee;
    let shipinfo = this.state.shipinfo;
    let showpay = this.state.showpay;
    let total = this.props.total;
    return (
      <div className="Checkout">
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
        {this.state.showpay ? (
          <Payment shipfee={shipfee} shipinfo={shipinfo} />
        ) : (
          <Shipping
            user={this.props.user}
            getshipfee={this.getshipfee}
            getshipinfo={this.getshipinfo}
            oldstate={shipinfo}
          />
        )}

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
                {shipfee ? "$" + shipfee.toFixed(2) : "Not yet calculated"}
              </li>
              <li>
                {shipfee
                  ? `$${(total + shipfee).toFixed(2)}`
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
