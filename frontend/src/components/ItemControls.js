import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = { inventory: undefined, active:"" };
    this.addToCart = this.addToCart.bind(this);
    this.changeActive = this.changeActive.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.inventory) {
      let obj = { inventory: {}, active: "" };
      this.props.options.forEach((option) => {
        let [name, qty] = option;
        obj.inventory[name] = qty;

        if (obj.active === "" && qty !== 0) {
          obj.active = name;
        }
      });
      this.setState(obj);
    }
    console.log(this.state);
  }

  addToCart(form) {
    form.preventDefault();
    console.log(form.target[0].value);
  }

  allSold = () =>
    Object.values(this.state.inventory).every((count) => count === 0);

  msg = (qty) =>
    qty === 0
      ? " (Out Of Stock)"
      : qty === 1
      ? " (Last One)"
      : qty <= 3
      ? " (Low Stock)"
      : "";

  optionList = (options) =>
    options.map((option) => {
      let [name, qty] = option;
      return (
        <option key={name} value={name} disabled={qty === 0}>
          {name + this.msg(qty)}
        </option>
      );
    });

  changeActive(e) {
    // let qty = this.state.inventory[option.target.value];
    // let warning = qty <= 5 ? `Only ${qty} remaining` : "";

    // this.setState({ warning: warning });
    this.setState({ active: e.target.value });
  }

  render() {
    let content;

    if (this.state.inventory && !this.allSold()) {
      let options = this.props.options;

      content = (
        <form onSubmit={this.addToCart}>
          <select onChange={this.changeActive} hidden={options.length === 1}>
            {this.optionList(options)}
          </select>
          <input type="submit" value="Add To Cart" />
        </form>
      );
    } else {
      content = <p>SOLD OUT</p>;
    }

    return <div className="ItemControls">{content}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.products.itemInfo.quantity,
    item: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, version) => {
      dispatch(addToCart(item, version));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemControls);
