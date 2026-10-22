import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 product-card shadow-sm border-0 rounded-4 overflow-hidden">
      {/* Image Section */}
      <div className="p-3 bg-white d-flex justify-content-center align-items-center" style={{ height: '220px' }}>
        <img 
          src={product.image} 
          className="img-fluid" 
          alt={product.title} 
          style={{ maxHeight: '100%', objectFit: 'contain' }} 
        />
      </div>
      
      <div className="card-body d-flex flex-column p-4">
        <span className="badge bg-light text-secondary text-uppercase mb-2 align-self-start border">
          {product.category}
        </span>
        
        <h6 className="card-title text-truncate fw-semibold mb-3" title={product.title}>
          {product.title}
        </h6>
        
        <div className="mt-auto">
          <h4 className="text-dark fw-bold mb-3">${product.price.toFixed(2)}</h4>
          
          <div className="d-flex gap-2">
            <Link to={`/product/${product.id}`} state={{ product }} className="btn btn-outline-dark w-50 btn-sm py-2">
              Details
            </Link>
            <button onClick={() => addToCart(product)} className="btn btn-dark w-50 btn-sm py-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;