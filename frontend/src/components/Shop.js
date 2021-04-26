import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import { queryStr } from "../util/Util";

class Shop extends Component {
  componentDidMount() {
    let query = queryStr(this.props);
    this.props
      .fetchAll(undefined, false)
      .then(this.props.getFilters)
      .then(() => this.props.fetchAll(query));
  }

  componentDidUpdate() {
    let query = queryStr(this.props);
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
    fetchAll: (query, paginate) => dispatch(fetchAllItems(query, paginate)),
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Shop);

