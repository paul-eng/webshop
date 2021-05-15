import React, { useState } from "react";
import { useSelector } from "react-redux";
import {itemDetails} from "../../util/Util"
// styling in Checkout.css

const ViewItems = () => {
  const items = useSelector((state) => state.cart.items);
  const [expand, setExpand] = useState(false);

  let itemList = itemDetails(items)

  return (
    <div className="ViewItems">
      <article onClick={() => setExpand(!expand)}>
        <h3>{expand ? "-" : "+"}</h3>
        <h3>View items</h3>
      </article>
      <ul style={{display: expand ? "block" : "none"}}>{itemList}</ul>
    </div>
  );
};

export default ViewItems;
