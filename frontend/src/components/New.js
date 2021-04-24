import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNew } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class New extends Component {
  componentDidMount() {
    this.fetchNew();
  }

  componentDidUpdate() {
    this.fetchNew();
  }

  fetchNew() {
    let query = queryString.parse(this.props.location.search);
    return this.props.fetchNew(query);
  }

  render() {
    return (
      <div className="New">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNew: (query) => dispatch(fetchNew(query)),
  };
};

export default connect(null, mapDispatchToProps)(New);
