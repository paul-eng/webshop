import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItem } from "../actions/ItemActions";
import ItemInfo from "./ItemInfo";

class Item extends Component {
  componentDidMount() {
    let item = this.props.match.params.item;
    this.props.fetchItem(item);
  }

  render() {
    return (
      <div className="Item">
        <ItemInfo />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem: (item) => dispatch(fetchItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
