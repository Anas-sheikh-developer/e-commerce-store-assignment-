import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top px-4 py-3 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
           <span className="text-primary">My</span>Store
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active fw-bold text-primary" : "nav-link text-dark fw-medium"}
          >
            Home
          </NavLink>
          
          <Link to="/cart" className="btn btn-dark d-flex align-items-center position-relative px-3 py-2">
            <span>🛒 Cart</span>
            {/* Badge for Cart Count */}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;