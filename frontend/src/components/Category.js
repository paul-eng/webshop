import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Category extends Component {
  componentDidMount() {
    this.fetchCat().then(this.props.getFilters);
  }

  componentDidUpdate(prevProps) {
    // trigger update if path changes without unmounting component ex. from /category/:a to /category/:b
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchCat().then(this.props.getFilters);
    } else {
      this.fetchCat();
    }
  }

  fetchCat() {
    let parsedParam = this.props.match.params.cat.split("-").join(" ");
    let query = queryString.parse(this.props.location.search);
    return this.props.fetchCat(parsedParam, query);
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
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Category);
