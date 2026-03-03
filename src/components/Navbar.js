import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { cart, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo"> Happy Cart</Link>
      
      <div className="nav-actions">

        <Link to="/" className="nav-link">Home</Link>
        
        <div className="cart-wrapper">
          <button className="cart-trigger" onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>

          {isCartOpen && (
            <div className="cart-preview-box">
              <div className="cart-header">
                <h4>Shopping Cart</h4>
                <button onClick={() => setIsCartOpen(false)}>×</button>
              </div>
              
              {cart.length === 0 ? (
                <p className="empty-txt">Your cart is empty!</p>
              ) : (
                <>
                  <div className="cart-items-container">
                    {cart.map((item) => (
                      <div key={item.id} className="mini-cart-item">
                        <img src={item.image} alt={item.title} />
                        <div className="item-details">
                          <h6>{item.title}</h6>
                          <p>{item.quantity} x ${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <strong>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</strong>
                    
                    <Link 
                      to="/checkout" 
                      className="checkout-btn" 
                      style={{ textDecoration: 'none', display: 'block' }}
                      onClick={() => setIsCartOpen(false)} 
                    >
                      Checkout Now
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;