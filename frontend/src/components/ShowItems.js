import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Item from "./Item";
import { fetchAllItems } from "../actions/ItemActions";
import "../styles/ShowItems.css";

class ShowItems extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchAllItems();
  }

  render() {
    let itemList = this.props.itemList;

    if (itemList.length < 1) {
      itemList = "No items found";
    } else {
      itemList = itemList.map((item) => <Item item={item} key={item._id} />);
    }

    return (
      <div className="ShowItems">
        <h2>All Cameras</h2>
        {itemList}
        <br></br>
        <Link to="/add-item">Add A Camera</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemList: state.products.itemList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItems: () => {
      dispatch(fetchAllItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowItems);
