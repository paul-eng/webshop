import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearch } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import { queryStr } from "../util/Util";

class Search extends Component {
  componentDidMount() {
    let query = queryStr(this.props);
    this.props.fetchSearch(query).then(this.props.getFilters);
  }
  componentDidUpdate() {
    let query = queryStr(this.props);
    this.props.fetchSearch(query);
  }

  render() {
    return (
      <div className="Search">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearch: (query) => dispatch(fetchSearch(query)),
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Search);
