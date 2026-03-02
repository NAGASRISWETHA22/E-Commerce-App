import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h4 className="product-title">{product.title}</h4>
      <p className="product-price">${product.price}</p>
      <div className="view-btn">View Details</div>
    </Link>
  );
};

export default ProductCard;