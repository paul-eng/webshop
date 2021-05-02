import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Product.css";

const Product = (props) => {
  const item = props.item;
  let history = useHistory();

  function onClick(e) {
    e.preventDefault();
    history.push("/" + item.pathname);
  }

  return (
    <div className="Product">
      <img onClick={onClick} alt="temp" src={`${item.gallery[0]}`} />

      <section>
        {/* onClick instead of <Link> so whitespace created by line-height around h3 text is not clickable */}
        <h3 onClick={onClick}>
          {item.brand} {item.name}
        </h3>
      </section>
      <h3>${item.price}</h3>
    </div>
  );
};

export default Product;
