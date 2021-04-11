import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Item.css";

const Item = (props) => {
  const item = props.item;
  const pathName = `/${item.brand}-${item.name}/${item._id}`
    .split(" ")
    .join("-")
    .toLowerCase();

  let history = useHistory();

  function onClick() {
    // onClick instead of <Link> so whitespace around h3 text is not clickable
    history.push(pathName);
  }

  return (
    <div className="Item">
      <img onClick={onClick} alt="temp" src={`${item.gallery[0]}`} />

      <section>
        <h3 onClick={onClick}>
          {item.brand} {item.name}
        </h3>
      </section>
      <h3>${item.price}</h3>
    </div>
  );
};

export default Item;
