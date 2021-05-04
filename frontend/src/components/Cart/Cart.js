import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { updateCart } from "../../actions/CartActions";
import { Link } from "react-router-dom";
import "../../styles/Cart.css";

const Cart = (props) => {
  let cartItems = props.items;

  function versionSplitter(item) {
    let versions = [];
    item.stock.forEach((version) => {
      let separate = Object.assign({}, item, {
        stock: { type: version.type, qty: version.qty },
      });
      versions.push(separate);
    });
    return versions;
  }

  if (cartItems.length < 1) {
    return (
      <span className="EmptyCart">
        <h3>You have no items in your cart.</h3>
        <h3>
          <Link to="/new-arrivals">View Latest</Link>
        </h3>
      </span>
    );
  } else {
    let separateItems = [...cartItems]
      .map((item) => versionSplitter(item))
      .flat();
    // reverse so recently added items are at top of cart
    cartItems = separateItems
      .reverse()
      .map((item) => (
        <CartItem item={item} key={item.name + item.stock.type} />
      ));
  }

  function updateQty(form) {
    form.preventDefault();
    // don't need the last form value (submit button) so slice
    let updates = Array.from(form.target.elements).slice(0, -1);
    props.updateCart(updates);
  }

  return (
    <div className="Cart">
      <h3>CART</h3>
      <form onSubmit={updateQty}>
        <ul>{cartItems}</ul>
        <input type="submit" value="UPDATE CART" />
      </form>
      <section>
        <aside>
          <ul>
            <li>Subtotal:</li>
            <li>Tax:</li>
            <li>Total:</li>
          </ul>
          <ul>
            <li>${props.total.toFixed(2)}</li>
            <li>${(props.total * 0.08875).toFixed(2)}</li>
            <li>${(props.total * 1.08875).toFixed(2)}</li>
          </ul>
        </aside>
        <p>
          Shipping will be calculated at checkout where vouchers also can be
          applied.
        </p>
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (updates) => dispatch(updateCart(updates)),
  };
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
