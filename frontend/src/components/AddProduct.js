import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      brand: "",
      description: "",
      price: "",
      quantity: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.name,
      category: this.state.category,
      brand: this.state.brand,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
    };

    axios
      .post("http://localhost:8080/api/products", data)
      .then((res) => {
        alert("Success");
        this.setState({
          name: "",
          category: "",
          brand: "",
          description: "",
          price: "",
          quantity: "",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  render() {
    return (
      <div className="AddProduct">
        <Link to="/">Back Home</Link>
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="formInput"
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Category"
            name="category"
            className="formInput"
            value={this.state.category}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            className="formInput"
            value={this.state.brand}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="formInput"
            value={this.state.description}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="formInput"
            value={this.state.price}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            className="formInput"
            value={this.state.quantity}
            onChange={this.onChange}
          />

          <input type="submit" className="formSubmit" />
        </form>
      </div>
    );
  }
}

export default AddProduct;
