import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="loader">Loading...</div>;

  return (
    <div className="detail-container" style={{ padding: '50px 10%', display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
      <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }} />
      <div style={{ flex: 1 }}>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>← Back</Link>
        <h1 style={{ margin: '20px 0' }}>{product.title}</h1>
        <p style={{ fontSize: '18px', color: '#2ecc71', fontWeight: 'bold' }}>${product.price}</p>
        <p style={{ margin: '20px 0', lineHeight: '1.6', color: '#666' }}>{product.description}</p>
        
        <button 
          onClick={() => {
            addToCart(product);
            alert("Added to Cart!");
          }}
          style={{ padding: '15px 30px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;   