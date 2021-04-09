import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ItemInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/items/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          item: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="ItemInfo">
        <Link to="/">Back to All</Link>
        <ul>
          <li>Brand: {this.state.item.brand}</li>
          <li>Name: {this.state.item.name}</li>
          <li>Class: {this.state.item.category}</li>
          <li>Price: {this.state.item.price}</li>
        </ul>
      </div>
    );
  }
}

export default ItemInfo;
