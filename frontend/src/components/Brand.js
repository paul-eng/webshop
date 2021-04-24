import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBrand } from "../actions/ItemActions";
import { getFilters } from "../actions/FilterActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Brand extends Component {
  componentDidMount() {
    this.fetchBrand().then(this.props.getFilters);
  }

  componentDidUpdate(prevProps) {
    // trigger update if path changes without unmounting component ex. from /brand/:a to /brand/:b
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchBrand().then(this.props.getFilters);
    } else {
      this.fetchBrand();
    }
  }

  fetchBrand() {
    let parsedParam = this.props.match.params.brand.split("-").join(" ");
    let query = queryString.parse(this.props.location.search);
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
