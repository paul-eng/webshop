import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearch } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import { queryStr } from "../util/Util";

class Search extends Component {
  componentDidMount() {
      let query = queryStr(this.props)
    this.props.fetchSearch(query)
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
  };
};

export default connect(null, mapDispatchToProps)(Search);
