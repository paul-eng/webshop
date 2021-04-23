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
    this.props.fetchNew(query.sort);
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
    fetchNew: (field)=>dispatch(fetchNew(field)),
  };
};

export default connect(null, mapDispatchToProps)(New);
