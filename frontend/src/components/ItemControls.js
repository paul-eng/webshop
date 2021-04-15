import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = { inventory: "", active: "", warning: "" };
    this.addToCart = this.addToCart.bind(this);
    this.changeActive = this.changeActive.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let inv = this.state.inventory;
    let active = this.state.active;

    if (!inv) {
      this.makeInventory();
    }

    if (prevState.active !== active) {
      let warning = inv[active] <= 5 ? `Only ${inv[active]} remaining` : "";
      this.setState({ warning: warning });
    }
  }

  makeInventory() {
    let obj = { inventory: {} };
    this.props.options.forEach((option) => {
      let [name, qty] = option;
      obj.inventory[name] = qty;

      if (obj.active === undefined && qty !== 0) {
        obj.active = name;
      }
    });
    this.setState(obj);
  }

  addToCart(form) {
    form.preventDefault();

    if (this.inStock()) {
      this.props.addToCart(this.props.item, this.state.active);
    }
  }

  inStock() {
    let item = this.props.item;
    let option = this.state.active;
    let cart = this.props.cart;

    let inCart = cart.find((prod) => prod.name === item.name);
    if (inCart && inCart.quantity.flat().includes(option)) {
      let qt = [inCart.quantity, item.quantity].map((qt) => {
        return qt.find((version) => version[0] === option)[1];
      });
      return qt[0] >= qt[1]
        ? alert(
            `${this.props.item.name} - ${this.state.active} only has ${qt[0]} in stock`
          )
        : true;
    }

    return true;
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
    this.setState({ active: e.target.value });
  }

  render() {
    let options = this.props.options;
    let warning = <p>{this.state.warning}</p>;
    let content =
      this.state.inventory && !this.allSold() ? (
        <form onSubmit={this.addToCart}>
          <select onChange={this.changeActive} hidden={options.length === 1}>
            {this.optionList(options)}
          </select>
          <input type="submit" value="Add To Cart" />
        </form>
      ) : (
        <aside>SOLD OUT</aside>
      );

    return (
      <div className="ItemControls">
        {content}
        {warning}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.products.itemInfo.quantity,
    item: state.products.itemInfo,
    cart: state.cart.items,
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
