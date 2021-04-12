import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/ItemActions";
import ShowItems from "./ShowItems";

class Category extends Component {
  componentDidMount() {
    let parsedParam = this.props.match.params.cat.split("-").join(" ");
    this.props.fetchCat(parsedParam);
  }

  render() {
    return (
      <div className="Category">
        <ShowItems />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: (cat) => dispatch(fetchCategory(cat)),
  };
};

export default connect(null, mapDispatchToProps)(Category);
