import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNew } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class New extends Component {
  componentDidMount() {
    this.props.fetchNew();
  }

  componentDidUpdate() {
    let query = queryString.parse(this.props.location.search);
    this.props.fetchNew(query.sort, query.brand);
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
    fetchNew: (sort, brand)=>dispatch(fetchNew(sort, brand)),
  };
};

export default connect(null, mapDispatchToProps)(New);
