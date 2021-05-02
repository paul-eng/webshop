import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions/CartActions";
import { stockType, stockQty, matchStock, matchItem } from "../../util/Util";
import "../../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined, warning: "" };
    this.addToCart = this.addToCart.bind(this);
    this.changeActive = this.changeActive.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let selected = this.state.selected;
    if (selected === undefined && !this.allSold()) {
      this.firstInStock();
    }

    if (prevState.selected !== selected) {
      let available = matchStock(this.props.stock, selected);
      let warning = available.qty <= 5 ? `ONLY ${available.qty} REMAINING` : "";
      this.setState({ warning: warning });
    }
  }

  firstInStock() {
    let i = 0;
    let stock = this.props.stock;
    let selected;

    while (selected === undefined) {
      if (stock[i].qty !== 0) {
        selected = stock[i].type;
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
    let inCart = matchItem(this.props.cart, item._id);
    if (inCart) {
      if (stockType(inCart.stock).includes(selected)) {

        let [cartQty, stockQty] = [
          matchStock(inCart.stock, selected).qty,
          matchStock(item.stock, selected).qty,
        ];

        return cartQty >= stockQty
          ? alert(
              `${this.props.item.name} - ${this.state.selected} only has ${stockQty} in stock`
            )
          : true;
      }
    }
    return true;
  }

  allSold = () => stockQty(this.props.stock).every((count) => count === 0);

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
    let stock = this.props.stock;
    let warning = <aside>{this.state.warning}</aside>;
    let content =
      stock && !this.allSold() ? (
        <form onSubmit={this.addToCart}>
          <select onChange={this.changeActive} hidden={stock.length === 1}>
            {this.optionList(stock)}
          </select>
          <input type="submit" value="ADD TO CART" />
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
    stock: state.products.itemInfo.stock,
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
