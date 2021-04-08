import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Product = (props) => {
  const product = props.product;
    console.log(props);
  return (
    <div className="productName">
      <Link to={`/product-info/${product._id}`}>{product.name}</Link>
    </div>
  );
};

export default Product;
