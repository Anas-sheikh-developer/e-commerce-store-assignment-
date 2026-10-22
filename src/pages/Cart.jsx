import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="display-4 mb-3">🛒</h1>
        <h2 className="mb-4 fw-bold">Your Cart is Empty</h2>
        <Link to="/" className="btn btn-dark px-4 py-2 rounded-pill">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 fw-bold">Shopping Cart</h2>
      
      <div className="row">
        {/* Cart Items List */}
        <div className="col-lg-8 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm border-0 rounded-4">
              <div className="card-body d-flex flex-column flex-md-row align-items-md-center p-4">
                <div className="bg-light p-2 rounded-3 me-md-4 mb-3 mb-md-0 text-center" style={{ width: '100px', height: '100px' }}>
                  <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                
                <div className="flex-grow-1 mb-3 mb-md-0">
                  <h6 className="text-truncate fw-semibold mb-1" style={{ maxWidth: '300px' }}>{item.title}</h6>
                  <p className="text-muted small mb-0">${item.price.toFixed(2)} each</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="d-flex align-items-center me-md-4 mb-3 mb-md-0">
                  <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span className="mx-3 fw-bold">{item.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                
                {/* Price & Remove */}
                <div className="text-md-end" style={{ minWidth: '100px' }}>
                  <h5 className="mb-2 text-primary fw-bold">${(item.price * item.quantity).toFixed(2)}</h5>
                  <button className="btn btn-link text-danger p-0 text-decoration-none small" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h4 className="mb-4 fw-bold">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-3 text-secondary">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-secondary">
                <span>Shipping</span>
                <span className="text-success fw-medium">Free</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold mb-0">Total</h5>
                <h5 className="fw-bold mb-0 text-primary">${totalPrice.toFixed(2)}</h5>
              </div>
              
              <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;