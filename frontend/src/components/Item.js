import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItem, clearItem } from "../actions/ItemActions";
import ItemInfo from "./ItemInfo";
import Nav from "./Nav";
import "../styles/Item.css";

class Item extends Component {
  componentDidMount() {
    let item = this.props.match.params.item;
    this.props.fetchItem(item);
  }

  componentWillUnmount() {
    this.props.clearItem();
  }

  render() {
    return (
      <div className="Item">
        <ItemInfo />
        <Nav />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem: (item) => dispatch(fetchItem(item)),
    clearItem: () => dispatch(clearItem()),
  };
};

export default connect(null, mapDispatchToProps)(Item);
