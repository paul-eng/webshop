import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Category extends Component {
  componentDidMount() {
    let parsedParam = this.props.match.params.cat.split("-").join(" ");
    this.props.fetchCat(parsedParam);
  }

  componentDidUpdate() {
    // trigger update if path changes without unmounting component ex. from /category/:a to /category/:b
    let parsedParam = this.props.match.params.cat.split("-").join(" ");
    let query = queryString.parse(this.props.location.search);
    this.props.fetchCat(parsedParam, query.filter);
  }

  render() {
    return (
      <div className="Category">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: (cat, field) => dispatch(fetchCategory(cat, field)),
  };
};

export default connect(null, mapDispatchToProps)(Category);
