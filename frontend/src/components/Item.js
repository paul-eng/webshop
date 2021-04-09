import React from "react";
import { Link } from "react-router-dom";
import "../styles/Item.css";

const Item = (props) => {
  const item = props.item;
  const pathName = `/item/${item.brand}-${item.name}`
    .split(" ")
    .join("-")
    .toLowerCase();

  return (
    <div className="Item">
      <Link to={{ pathname: pathName, state: { id: item._id } }}>
        <img src="https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/3d/44/92/3d449290-a215-6d60-457a-ad3ff3481f22/source/256x256bb.jpg" />
      </Link>

      <div className="ItemCap">
        <Link to={{ pathname: pathName, state: { id: item._id } }}>
          <h3>
            {item.brand} {item.name}
          </h3>
        </Link>
        <h3>${item.price}</h3>
      </div>
    </div>
  );
};

export default Item;
