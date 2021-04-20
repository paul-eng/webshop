import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = { inventory: undefined, selected: undefined, warning: "" };
    this.addToCart = this.addToCart.bind(this);
    this.changeActive = this.changeActive.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let inv = this.state.inventory;
    let selected = this.state.selected;

    if (!inv) {
      this.makeInventory();
    }

    if (prevState.selected !== selected) {
      let warning = inv[selected] <= 5 ? `Only ${inv[selected]} remaining` : "";
      this.setState({ warning: warning });
    }
  }

  makeInventory() {
    let obj = { inventory: {} };
    this.props.options.forEach((option) => {
      let [name, qty] = option;
      obj.inventory[name] = qty;

      if (obj.selected === undefined && qty !== 0) {
        // trigger warning message for first instock item (which is what the form defaults to displaying when first created)
        obj.selected = name;
      }
    });
    this.setState(obj);
  }

  addToCart(form) {
    form.preventDefault();
    if (this.inStock()) {
      this.props.addToCart(this.props.item, this.state.selected);
    }
  }

  inStock() {
    let item = this.props.item;
    let selected = this.state.selected;

    let inCart = this.props.cart.find((prod) => prod.name === item.name);

    if (inCart && inCart.quantity.flat().includes(selected)) {
      let qt = [inCart.quantity, item.quantity].map(
        (qt) => qt.find((version) => version[0] === selected)[1]
      );
      return qt[0] >= qt[1]
        ? alert(
            `${this.props.item.name} - ${this.state.selected} only has ${qt[0]} in stock`
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
    this.setState({ selected: e.target.value });
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
