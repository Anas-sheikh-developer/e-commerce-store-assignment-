import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2>Product Not Found!</h2>
        <button className="btn btn-dark mt-3" onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <button className="btn btn-link text-decoration-none text-secondary px-0 mb-4" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      <div className="row align-items-center bg-white shadow-sm rounded-4 p-4 p-md-5">
        {/* Image Side */}
        <div className="col-md-5 mb-4 text-center">
          <div className="p-4 bg-light rounded-4 d-inline-block w-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="img-fluid" 
              style={{ maxHeight: '350px', objectFit: 'contain' }} 
            />
          </div>
        </div>
        
        {/* Details Side */}
        <div className="col-md-7 ps-md-5">
          <span className="badge bg-secondary text-uppercase mb-3 px-3 py-2 rounded-pill">
            {product.category}
          </span>
          <h2 className="fw-bold mb-3">{product.title}</h2>
          
          <div className="d-flex align-items-center mb-4">
            <span className="text-warning fs-5 me-2">★ {product.rating?.rate || '4.5'}</span>
            <small className="text-muted">({product.rating?.count || '100'} reviews)</small>
          </div>

          <h2 className="text-primary fw-bold mb-4">${product.price.toFixed(2)}</h2>
          <p className="text-secondary mb-5" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
            {product.description}
          </p>
          
          <button 
            onClick={() => addToCart(product)} 
            className="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold w-100 w-md-auto shadow"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;