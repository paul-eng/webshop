import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAllItems } from "../actions/ItemActions";
import ContentHeader from "./ContentHeader";
import ShowProducts from "./ShowProducts";
import Nav from "./Nav";
import Page from "./Page";
import "../styles/ContentArea.css";

class ContentArea extends Component {
  componentWillUnmount() {
    this.props.clearAllItems();
  }

  render() {
    return (
      <div className="ContentArea">
        <ContentHeader />
        <ShowProducts />
        <Nav />
        <Page />
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
