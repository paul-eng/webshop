import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBrand } from "../actions/ItemActions";
import ContentArea from "./ContentArea";
import queryString from "query-string";

class Brand extends Component {
  componentDidMount() {
    let parsedParam = this.props.match.params.brand.split("-").join(" ");
    this.props.fetchBrand(parsedParam);
  }

  componentDidUpdate() {
    // trigger update if path changes without unmounting component ex. from /brand/:a to /brand/:b
    let parsedParam = this.props.match.params.brand.split("-").join(" ");
    let query = queryString.parse(this.props.location.search);
    this.props.fetchBrand(parsedParam, query.sort);
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
    fetchBrand: (brand, field) => dispatch(fetchBrand(brand, field)),
  };
};

export default connect(null, mapDispatchToProps)(Brand);
