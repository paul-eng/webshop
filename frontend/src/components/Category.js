import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import { queryStr, paramStr } from "./Util";

class Category extends Component {
  componentDidMount() {
    let query = queryStr(this);
    this.fetchCat()
      .then(this.props.getFilters)
      .then(() => this.fetchCat(query));
  }

  componentDidUpdate(prevProps) {
    // trigger update if path changes without unmounting component ex. from /category/:a?somequery to /category/:a?diffquery
    // update filters if component has changed "pages" without unmounting ex. from /category/:a to /category/:b
    let query = queryStr(this);
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchCat(query).then(this.props.getFilters);
    } else {
      this.fetchCat(query);
    }
  }

  fetchCat(query) {
    let parsedParam = paramStr(this).cat;
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
