import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, setMsg } from "../../actions/CartActions";
import { stockTypes, stockQtys, matchStock, matchItem } from "../../util/Util";
import plusSVG from "../../icons/plus.svg";
import "../../styles/ItemControls.css";

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined, warning: "", add: false };
    this.addToCart = this.addToCart.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.onClick = this.onClick.bind(this);
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

    if (prevProps.msg !== this.props.msg) this.setState({ add: false });
  }

  componentWillUnmount() {
    clearTimeout(this.autoclose);
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
    this.setState({ add: true });
    this.autoclose = setTimeout(() => this.setState({ add: false }), 3500);
  }

  onClick() {
    this.setState({ add: false });
    clearTimeout(this.autoclose);
  }

  inStock() {
    let item = this.props.item;
    let selected = this.state.selected;
    let inCart = matchItem(this.props.cart, item._id);
    if (inCart) {
      if (stockTypes(inCart.stock).includes(selected)) {
        let [cartQty, stockQty] = [
          matchStock(inCart.stock, selected).qty,
          matchStock(item.stock, selected).qty,
        ];

        if (cartQty >= stockQty) {
          this.props.setMsg(
            `${this.props.item.name} - ${this.state.selected} only has ${stockQty} in stock`
          );
          return false;
        }
      }
    }
    return true;
  }

  allSold = () => stockQtys(this.props.stock).every((count) => count === 0);

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
    let warning = <article>{this.state.warning}</article>;
    let content =
      stock && !this.allSold() ? (
        <form onSubmit={this.addToCart}>
          <select onChange={this.changeActive} hidden={stock.length === 1}>
            {this.optionList(stock)}
          </select>
          <input type="submit" value="ADD TO CART" />
        </form>
      ) : (
        <article>SOLD OUT</article>
      );

    return (
      <div className="ItemControls">
        <section className={this.state.add && !this.props.msg ? "popup" : ""}>
          <h3>
            You added {this.props.item.brand} {this.props.item.name} -{" "}
            {this.state.selected} to your shopping cart.
          </h3>
          <aside onClick={this.onClick}>
            <img src={plusSVG} alt="plus" />
          </aside>
        </section>
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
    msg: state.nav.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, version) => {
      dispatch(addToCart(item, version));
    },
    setMsg: (msg) => dispatch(setMsg(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemControls);
