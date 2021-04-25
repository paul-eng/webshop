import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Category extends Component {
  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    this.fetchCat()
      .then(this.props.getFilters)
      .then(() => this.fetchCat(query));
  }

  componentDidUpdate(prevProps) {
    // trigger update if path changes without unmounting component ex. from /category/:a?somequery to /category/:a?diffquery
    // update filters if component has changed "pages" without unmounting ex. from /category/:a to /category/:b
    let query = queryString.parse(this.props.location.search);
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchCat(query).then(this.props.getFilters);
    } else {
      this.fetchCat(query);
    }
  }

  fetchCat(query) {
    let parsedParam = this.props.match.params.cat.split("-").join(" ");
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
