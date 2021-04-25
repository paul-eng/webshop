import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Shop extends Component {
  componentDidMount() {
    let query = queryString.parse(this.props.location.search, {arrayFormat: "bracket"});
    this.props
      .fetchAll()
      .then(this.props.getFilters)
      .then(() => this.props.fetchAll(query));
  }

  componentDidUpdate() {
    let query = queryString.parse(this.props.location.search, {arrayFormat: "bracket"});
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
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Shop);
