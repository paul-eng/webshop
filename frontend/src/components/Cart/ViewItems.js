import React, { useState } from "react";
import { useSelector } from "react-redux";
// styling in Checkout.css

const ViewItems = () => {
  const items = useSelector((state) => state.cart.items);
  const [expand, setExpand] = useState(false);

  let itemList = items.map((item) => {
    return item.stock.map((version) => (
      <li key={item.name + version.type}>
        <h3>{item.brand + " " + item.name}</h3>
        <h3>{version.type}</h3>
        <h3>Qty {version.qty}</h3>
        <h3>{item.price}</h3>
      </li>
    ));
  });

  return (
    <div className="ViewItems">
      <article onClick={() => setExpand(!expand)}>
        <h3>{expand ? "-" : "+"}</h3>
        <h3>View Items</h3>
      </article>
      <ul style={{display: expand ? "block" : "none"}}>{itemList}</ul>
    </div>
  );
};

export default ViewItems;
