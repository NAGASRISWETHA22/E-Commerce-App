import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate);

    setFilteredProducts(result);
    setCurrentPage(1); 
  }, [searchTerm, category, sortBy, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) return <div className="loader">Loading Products...</div>;

  return (
    <div className="home-container">
      <div className="controls-section">
        <input 
          className="search-bar"
          type="text" 
          placeholder="Search products..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="filter-group">
          <select className="filter-select" onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewellers">Jewellers</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <select className="filter-select" onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {currentItems.map(item => <ProductCard key={item.id} product={item} />)}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1} 
            onClick={() => setCurrentPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;