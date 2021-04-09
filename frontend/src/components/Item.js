import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  const item = props.item;
  return (
    <div className="Item">
      <Link to={`/item/${item._id}`}>{item.brand} {item.name}</Link>
    </div>
  );
};

export default Item;
