import React, { Component } from "react";
import axios from "axios";
import "../../styles/AddItem.css";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      brand: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      type1: "",
      type2: "",
      type3: "",
      type4: "",
      type5: "",
      qty1: "",
      qty2: "",
      qty3: "",
      qty4: "",
      qty5: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let stock = [];
    for (let i = 1; i <= 5; i++) {
      console.log(i);
      if (this.state[`type${i}`] !== "") {
        let newObj = {};
        newObj.type = this.state[`type${i}`];

        newObj.qty = parseInt(this.state[`qty${i}`]);
        stock.push(newObj);
      }
    }

    let { name, category, brand, description, price } = this.state;
    const data = {
      name,
      category,
      brand,
      description,
      price: parseInt(price),
      gallery: [
        this.state.img1,
        this.state.img2,
        this.state.img3,
        this.state.img4,
      ].filter((el) => el !== ""),
      pathname: `${this.state.brand}-${this.state.name}`
        .split(" ")
        .join("-")
        .toLowerCase(),
      stock,
    };

    console.log(data);
    axios
      .post("https://restfulgoods.herokuapp.com/api/items", data)
      .then((res) => {
        alert("Success");
        this.setState({
          name: "",
          category: "",
          brand: "",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          price: "",
          img1: "",
          img2: "",
          img3: "",
          img4: "",
          type1: "",
          type2: "",
          type3: "",
          type4: "",
          type5: "",
          qty1: "",
          qty2: "",
          qty3: "",
          qty4: "",
          qty5: "",
        });
        // this.props.history.push("/");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  render() {
    return (
      <div className="AddItem Form">
        <form onSubmit={this.onSubmit}>
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
            placeholder="Price"
            name="price"
            className="formInput"
            value={this.state.price}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Image 1"
            name="img1"
            className="formInput"
            value={this.state.img1}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Image 2 (Optional)"
            name="img2"
            className="formInput"
            value={this.state.img2}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Image 3 (Optional)"
            name="img3"
            className="formInput"
            value={this.state.img3}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Image 4 (Optional)"
            name="img4"
            className="formInput"
            value={this.state.img4}
            onChange={this.onChange}
          />
          <section>
            <input
              type="text"
              placeholder="Stock Type 1"
              name="type1"
              className="formInput"
              value={this.state.type1}
              onChange={this.onChange}
            />
            <input
              type="text"
              placeholder="Stock Qty 1"
              name="qty1"
              className="formInput"
              value={this.state.qty1}
              onChange={this.onChange}
            />
          </section>
          <section>
            <input
              type="text"
              placeholder="Stock Type 2"
              name="type2"
              className="formInput"
              value={this.state.type2}
              onChange={this.onChange}
            />
            <input
              type="text"
              placeholder="Stock Qty 2"
              name="qty2"
              className="formInput"
              value={this.state.qty2}
              onChange={this.onChange}
            />
          </section>

          <section>
            <input
              type="text"
              placeholder="Stock Type 3"
              name="type3"
              className="formInput"
              value={this.state.type3}
              onChange={this.onChange}
            />
            <input
              type="text"
              placeholder="Stock Qty 3"
              name="qty3"
              className="formInput"
              value={this.state.qty3}
              onChange={this.onChange}
            />
          </section>
          <section>
            <input
              type="text"
              placeholder="Stock Type 4"
              name="type4"
              className="formInput"
              value={this.state.type4}
              onChange={this.onChange}
            />
            <input
              type="text"
              placeholder="Stock Qty 4"
              name="qty4"
              className="formInput"
              value={this.state.qty4}
              onChange={this.onChange}
            />
          </section>
          <section>
            <input
              type="text"
              placeholder="Stock Type 5"
              name="type5"
              className="formInput"
              value={this.state.type5}
              onChange={this.onChange}
            />
            <input
              type="text"
              placeholder="Stock Qty 5"
              name="qty5"
              className="formInput"
              value={this.state.qty5}
              onChange={this.onChange}
            />
          </section>
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="formInput"
              value={this.state.description}
              onChange={this.onChange}
            />

          <input type="submit" className="formSubmit" />
        </form>
      </div>
    );
  }
}

export default AddItem;
