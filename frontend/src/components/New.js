import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNew } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class New extends Component {
  componentDidMount() {
    let query = queryString.parse(this.props.location.search, {arrayFormat: "bracket"});
    this.props
      .fetchNew()
      .then(this.props.getFilters)
      .then(() => this.props.fetchNew(query));
  }

  componentDidUpdate() {
    let query = queryString.parse(this.props.location.search, {arrayFormat: "bracket"});
    this.props.fetchNew(query);
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
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(New);
