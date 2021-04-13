import React from "react";

const CartItem = (props) => {
  const item = props.item;

  return (
    <div className="cartItem">
      {item.brand} {item.name} - ${item.price}
      <br></br>
      {item.quantity[0]} Qty: {item.quantity[1]}
    </div>
  );
};

export default CartItem;
