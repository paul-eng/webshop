import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Item from "./Item";
import { fetchAllItems } from "../actions/ItemActions";
import "../styles/ShowItems.css";

class ShowItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllItems();
    axios
      .get("http://localhost:8080/api/items")
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });

    console.log(this.props);
  }

  render() {
    const items = this.state.items;
    let itemList;
    if (!items) {
      itemList = "No items found";
    } else {
      itemList = items.map((item) => <Item item={item} key={item._id} />);
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
