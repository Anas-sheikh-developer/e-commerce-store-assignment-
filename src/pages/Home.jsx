import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search aur Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Products load karne mein masla aa raha hai.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    // Search match
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    // Category match
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <h2 className="text-center mt-5 text-danger">{error}</h2>;

  return (
    <div className="container mt-4">
     <h1 className="mb-2 text-center fw-bold">Discover Your Style</h1>
<p className="text-center text-muted mb-5">Explore our premium collection of products.</p>
      
      {/* Search & Filter Bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search products by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select 
            className="form-select" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <h4 className="text-center mt-5 text-muted">No products found matching your criteria.</h4>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;