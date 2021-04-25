import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import { queryStr } from "../util/Util";

class Shop extends Component {
  componentDidMount() {
    let query = queryStr(this);
    this.props
      .fetchAll()
      .then(this.props.getFilters)
      .then(() => this.props.fetchAll(query));
  }

  componentDidUpdate() {
    let query = queryStr(this);
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
