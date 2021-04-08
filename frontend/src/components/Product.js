import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const product = props.product;
  return (
    <div className="Product">
      <Link to={`/product-info/${product._id}`}>{product.brand} {product.name}</Link>
    </div>
  );
};

export default Product;
