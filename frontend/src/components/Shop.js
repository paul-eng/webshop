import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Shop extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  componentDidUpdate() {
    let query = queryString.parse(this.props.location.search);
    this.props.fetchAll(query);
  }

  render() {
    return (
      <div className="Shop">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: (query) => dispatch(fetchAllItems(query)),
  };
};

export default connect(null, mapDispatchToProps)(Shop);
