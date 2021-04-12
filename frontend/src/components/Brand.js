import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBrand } from "../actions/ItemActions";
import ShowItems from "./ShowItems";

class Brand extends Component {
  componentDidMount() {
    let parsedParam = this.props.match.params.brand.split("-").join(" ");
    this.props.fetchBrand(parsedParam);
  }

  render() {
    return (
      <div className="Brand">
        <ShowItems />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrand: (brand) => dispatch(fetchBrand(brand)),
  };
};

export default connect(null, mapDispatchToProps)(Brand);
