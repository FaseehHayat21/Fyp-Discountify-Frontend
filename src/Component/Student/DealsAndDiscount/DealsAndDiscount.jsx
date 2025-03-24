import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import "./DealsAndDiscount.css"; // Make sure to create this CSS file

class DealsAndDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: 'No result',
      scannerVisible: false,
      searchTerm: '',
      filterCategory: 'all',
      filterSubcategory: 'all',
      deals: [
        { id: 1, title: 'Deal 1', category: 'electronics', subcategory: 'mobiles', description: '50% off on all electronics.' },
        { id: 2, title: 'Deal 2', category: 'clothing', subcategory: 'men', description: 'Buy 1 get 1 free on clothing.' },
        { id: 3, title: 'Deal 3', category: 'electronics', subcategory: 'laptops', description: '20% off on select electronics.' },
        { id: 4, title: 'Deal 4', category: 'home', subcategory: 'furniture', description: 'Up to 30% off on home essentials.' },
        { id: 5, title: 'Deal 5', category: 'food', subcategory: 'pizza', description: '30% off on all pizzas.' },
        { id: 6, title: 'Deal 6', category: 'food', subcategory: 'burger', description: 'Buy 2 get 1 free on burgers.' },
      ],
      subcategories: {
        electronics: ['all', 'mobiles', 'laptops'],
        clothing: ['all', 'men', 'women', 'kids'],
        home: ['all', 'furniture', 'kitchen'],
        food: ['all', 'pizza', 'burger', 'sushi'],
      }
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.toggleScanner = this.toggleScanner.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleScan(data) {
    const result = (typeof data === 'object' && data !== null && 'text' in data) ? data.text : 'Invalid result';
    
    if (result !== 'Invalid result') {
      this.setState({
        result: result,
        scannerVisible: false,
      });
    }
  }

  handleError(err) {
    console.error(err);
  }

  toggleScanner() {
    this.setState(prevState => ({
      scannerVisible: !prevState.scannerVisible
    }));
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleFilterChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getFilteredDeals() {
    const { deals, searchTerm, filterCategory, filterSubcategory } = this.state;
    return deals.filter(deal => 
      (filterCategory === 'all' || deal.category === filterCategory) &&
      (filterSubcategory === 'all' || deal.subcategory === filterSubcategory) &&
      deal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
      borderRadius: '8px',
      border: '2px solid #007bff',
    };

    const { filterCategory, subcategories, filterSubcategory } = this.state;
    const availableSubcategories = subcategories[filterCategory] || ['all'];

    return (
      <div className='deal-page'>
        {/* Top Bar */}
        <div className='top-bar'>
          <div className='nav-links'>
            <a href='#deals'>Deals</a>
            <a href='#scanqrcode' onClick={this.toggleScanner}>
              {this.state.scannerVisible ? 'Close Scanner' : 'Open Scanner'}
            </a>
          </div>
        
        </div>

        {/* Scanner */}
        {this.state.scannerVisible && (
          <div className='scanner-overlay'>
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
            />
          </div>
        )}

        {/* Result */}
        <div className='result-container'>
          <p className='result-text'>{this.state.result}</p>
        </div>

        {/* Deals List */}
        <div className='deals-container'>
        <div className='search-filter'>
            <input
              type='text'
              placeholder='Search deals...'
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
            />
            <select
              name="filterCategory"
              value={filterCategory}
              onChange={this.handleFilterChange}
            >
              <option value='all'>All Categories</option>
              <option value='electronics'>Electronics</option>
              <option value='clothing'>Clothing</option>
              <option value='home'>Home</option>
              <option value='food'>Food</option>
            </select>
            <select
              name="filterSubcategory"
              value={filterSubcategory}
              onChange={this.handleFilterChange}
            >
              {availableSubcategories.map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </select>
          </div>
          <h2>Available Deals</h2>
          <div className='deals-grid'>
            {this.getFilteredDeals().map(deal => (
              <div className='deal-card' key={deal.id}>
                <h3>{deal.title}</h3>
                <p>{deal.description}</p>
                <span className='deal-category'>{deal.category} - {deal.subcategory}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DealsAndDiscount;
