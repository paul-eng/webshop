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

  let errors = props.qtyError.length;

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
          </ul>
          <ul>
            <li>${props.total.toFixed(2)}</li>
          </ul>
        </aside>
        <p>Shipping will be calculated at checkout.</p>
        <Link to="/checkout">
          <input
            style={{
              pointerEvents: errors ? "none" : "auto",
              opacity: errors ? "50%" : "100%",
            }}
            type="submit"
            value="CHECKOUT"
          />
        </Link>
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
    qtyError: state.cart.qtyError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
