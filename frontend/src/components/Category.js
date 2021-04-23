import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Category extends Component {
  componentDidMount() {
    this.fetchCat();
  }

  componentDidUpdate() {
    // trigger update if path changes without unmounting component ex. from /category/:a to /category/:b
    this.fetchCat();
  }

  fetchCat() {
    let parsedParam = this.props.match.params.cat.split("-").join(" ");
    let query = queryString.parse(this.props.location.search);
    this.props.fetchCat(parsedParam, query);
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
    fetchCat: (cat, query) => dispatch(fetchCategory(cat, query)),
  };
};

export default connect(null, mapDispatchToProps)(Category);
