import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Shop extends Component {
  componentDidMount() {
    this.fetchAll().then(this.props.getFilters);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchAll().then(this.props.getFilters);
    } else {
      this.fetchAll();
    }
  }

  fetchAll() {
    let query = queryString.parse(this.props.location.search);
    return this.props.fetchAll(query);
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
