import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBrand } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Brand extends Component {
  componentDidMount() {
    let query = queryString.parse(this.props.location.search, {arrayFormat: "bracket"});
    this.fetchBrand()
      .then(this.props.getFilters)
      .then(() => this.fetchBrand(query));
  }

  componentDidUpdate(prevProps) {
    // trigger update if path changes without unmounting component ex. from /category/:a?somequery to /category/:a?diffquery
    // update filters if component has changed "pages" without unmounting ex. from /category/:a to /category/:b
    let query = queryString.parse(this.props.location.search, {arrayFormat: "bracket"});
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchBrand(query).then(this.props.getFilters);
    } else {
      this.fetchBrand(query);
    }
  }

  fetchBrand(query) {
    let parsedParam = this.props.match.params.brand.split("-").join(" ");
    return this.props.fetchBrand(parsedParam, query);
  }

  render() {
    return (
      <div className="Brand">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrand: (brandURI, query) => dispatch(fetchBrand(brandURI, query)),
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Brand);
