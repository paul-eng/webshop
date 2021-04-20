import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAllItems } from "../actions/ItemActions";
import ShowProducts from "./ShowProducts";
import Nav from "./Nav";
import Title from "./Title";
import "../styles/ContentArea.css";

class ContentArea extends Component {
  componentWillUnmount() {
    this.props.clearAllItems();
  }

  render() {
    return (
      <div className="ContentArea">
        <Title />
        <ShowProducts />
        <Nav />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearAllItems: () => dispatch(clearAllItems()),
  };
};

export default connect(null, mapDispatchToProps)(ContentArea);
