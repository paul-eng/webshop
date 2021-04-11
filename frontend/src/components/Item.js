import React from "react";
import { Link } from "react-router-dom";
import "../styles/Item.css";

const Item = (props) => {
  const item = props.item;
  const pathName = `/${item.brand}-${item.name}/${item._id}`
    .split(" ")
    .join("-")
    .toLowerCase();

  return (
    <div className="Item">
      <Link to={pathName}>
        <img alt="temp" src={`${item.gallery[0]}`} />
      </Link>

      <section>
        <Link to={pathName}>
          <h3>
            {item.brand} {item.name}
          </h3>
        </Link>
        <h3>${item.price}</h3>
      </section>
    </div>
  );
};

export default Item;
