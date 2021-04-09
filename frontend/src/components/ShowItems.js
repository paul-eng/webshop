import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import "../styles/ShowItems.css";

class ShowItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/items")
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  render() {
    const items = this.state.items;
    let itemList;

    if (!items) {
      itemList = "No items found";
    } else {
      itemList = items.map((item) => (
        <Item item={item} key={item._id} />
      ));
    }

    return (
      <div className="ShowItems">
        <h1>All Cameras</h1>
        {itemList}
        <br></br>
        <Link to="/add-item">Add A Camera</Link>
      </div>
    );
  }
}

export default ShowItems;
