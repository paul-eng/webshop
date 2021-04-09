import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  const item = props.item;
  const pathName = `/item/${item.brand}-${item.name}`
    .split(" ")
    .join("-")
    .toLowerCase();

  return (
    <div className="Item">
      <Link to={{ pathname: pathName, state: { id: item._id } }}>
        {item.brand} {item.name}
      </Link>
    </div>
  );
};

export default Item;
