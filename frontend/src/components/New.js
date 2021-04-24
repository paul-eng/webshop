import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNew } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class New extends Component {
  componentDidMount() {
    this.fetchNew().then(this.props.getFilters);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchNew().then(this.props.getFilters);
    } else {
      this.fetchNew();
    }
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
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(New);
