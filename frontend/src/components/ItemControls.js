import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = undefined;
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidUpdate() {
    if (!this.state) {
      let obj = {};
      this.props.options.forEach((option) => {
        obj[option[0]] = option[1];
      });
      this.setState(obj);
    }
  }

  addToCart(form) {
    form.preventDefault();
  }

  render() {
    let content = <p>SOLD OUT</p>;

    return <div className="ItemControls">{content}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.products.itemInfo.quantity,
    item: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, version) => {
      dispatch(addToCart(item, version));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemControls);
