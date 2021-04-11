import React from "react";

const CartItem = (props) => {
  const item = props.item;

  return (
    <div className="cartItem">
      {item.brand} {item.name} - ${item.price}
    </div>
  );
};

export default CartItem;
