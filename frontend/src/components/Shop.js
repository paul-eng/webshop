import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import ShowItems from "./ShowItems";

class Shop extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    return (
      <div className="Shop">
        <ShowItems />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAll: () => dispatch(fetchAllItems()),
  };
};

export default connect(null, mapDispatchToProps)(Shop);
