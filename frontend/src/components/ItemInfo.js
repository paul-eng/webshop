import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItem } from "../actions/ItemActions";

class ItemInfo extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchItem(id);
  }

  render() {
    const itemInfo = this.props.itemInfo;
    return (
      <div className="ItemInfo">
        <Link to="/">Back to All</Link>
        <ul>
          <li>Brand: {itemInfo.brand}</li>
          <li>Name: {itemInfo.name}</li>
          <li>Class: {itemInfo.category}</li>
          <li>Price: {itemInfo.price}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem: (id) => {
      dispatch(fetchItem(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInfo);
