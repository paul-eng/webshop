import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBrand } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Brand extends Component {
  componentDidMount() {
    this.fetchBrand();
  }

  componentDidUpdate() {
    // trigger update if path changes without unmounting component ex. from /brand/:a to /brand/:b
    this.fetchBrand();
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
  };
};

export default connect(null, mapDispatchToProps)(Brand);
