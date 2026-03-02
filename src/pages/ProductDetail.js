import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetail.css'; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="loader" style={{textAlign: 'center', padding: '100px'}}>Loading...</div>;

  return (
    <div className="detail-container">
      <img src={product.image} alt={product.title} className="detail-image" />
      
      <div className="detail-info">
        <Link to="/" className="back-link">← Back to Shopping</Link>
        <h1 style={{ fontSize: '2rem' }}>{product.title}</h1>
        <p className="price-tag">${product.price}</p>
        <p className="desc-text">{product.description}</p>
        
        <button 
          className="add-btn"
          onClick={() => {
            addToCart(product);
            alert("Success! Item added to cart.");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;