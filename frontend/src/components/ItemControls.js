import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/CartActions";
import "../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined, warning: "" };
    this.addToCart = this.addToCart.bind(this);
    this.changeActive = this.changeActive.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let selected = this.state.selected;

    if (!selected) {
      this.firstInStock();
    }

    if (prevState.selected !== selected) {
      let available = this.props.options.find((opt) => opt.type === selected);
      let warning = available.qty <= 5 ? `Only ${available.qty} remaining` : "";
      this.setState({ warning: warning });
    }
  }

  firstInStock() {
    let i = 0;
    let options = this.props.options;
    let selected;

    while (!selected) {
      if (options[i].qty !== 0) {
        selected = options[i].type;
      }
      i++;
    }

    this.setState({ selected: selected });
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

    if (inCart) {
      let cartTypes = inCart.stock.map((opt) => opt.type);
      if (cartTypes.includes(selected)) {
        let [cartQty, stockQty] = [inCart.stock, item.stock].map(
          (stock) => stock.find((version) => version.type === selected).qty
        );
        return cartQty >= stockQty
          ? alert(
              `${this.props.item.name} - ${this.state.selected} only has ${stockQty} in stock`
            )
          : true;
      }
    }
    return true;
  }

  allSold = () =>
    this.props.options.map((opt) => opt.qty).every((count) => count === 0);

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
      let { type, qty } = option;
      return (
        <option key={type} value={type} disabled={qty === 0}>
          {type + this.msg(qty)}
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
      options && !this.allSold() ? (
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
    options: state.products.itemInfo.stock,
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
