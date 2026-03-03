import React from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';

const stripePromise = loadStripe('pk_test_your_key');

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    alert("Payment Logic Triggered! Amount: $" + total.toFixed(2));
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement className="card-input" />
      <button type="submit" disabled={!stripe || total === 0} className="pay-btn">
        Pay Now (${total.toFixed(2)})
      </button>
    </form>
  );
};

const Checkout = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>
      <div className="checkout-content">
        <div className="cart-summary">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.quantity} x ${item.price}</p>
                  
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))
          )}
          <h3 className="final-total">Total Amount: ${total.toFixed(2)}</h3>
        </div>

        <div className="payment-section">
          <h3>Payment Details</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm total={total} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;