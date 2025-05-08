// import React, { useState, useEffect } from 'react';
// import './Vendor.css'; // Importing the Deals.css file

// function Vendors({ categoryName }) {
//   const [vendors, setVendors] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [deals, setDeals] = useState([]);
//   const [loadingVendors, setLoadingVendors] = useState(false);
//   const [loadingDeals, setLoadingDeals] = useState(false);
//   const [vendorError, setVendorError] = useState(null);
//   const [dealError, setDealError] = useState(null);

//   // Fetch vendors by specific Category
//   useEffect(() => {
//     if (categoryName) {
//       setLoadingVendors(true);
//       setVendorError(null); // Reset error state before fetching
//       fetch(`http://localhost:1000/api/auth/vendors?category=${categoryName}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           setVendors(data);
//           setLoadingVendors(false);
//         })
//         .catch(error => {
//           setVendorError('Error fetching vendors: ' + error.message);
//           setLoadingVendors(false);
//         });
//     }
//   }, [categoryName]);

//   // Fetch deals when a vendor is selected
//   useEffect(() => {
//     if (selectedVendor) {
//       setLoadingDeals(true);
//       setDealError(null); // Reset error state before fetching
//       fetch(`http://localhost:1000/api/auth/deals/${selectedVendor._id}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           setDeals(data);
//           setLoadingDeals(false);
//         })
//         .catch(error => {
//           setDealError('Error fetching deals: ' + error.message);
//           setLoadingDeals(false);
//         });
//     }
//   }, [selectedVendor]);
      
//   // Handle availing a deal
//   const availDeal = async (dealId) => {
//     try {
//       const studentId = localStorage.getItem('userid'); // Replace with the actual logged-in student's ID
//       const response = await fetch('http://localhost:1000/api/auth/avail-deal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ studentId, dealId }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Deal availed successfully!');
//       } else {
//         alert(data.message || 'Failed to avail deal.');
//       }
//     } catch (error) {
//       alert('An error occurred: ' + error.message);
//     }
//   };

//   // Reset the selected vendor to go back to the vendor list
//   const goBackToVendorList = () => {
//     setSelectedVendor(null);
//     setDeals([]); // Clear the deals when going back
//   };

//   return (
//     <div>
//       {loadingVendors && <p className="loading-message">Loading vendors...</p>}
//       {vendorError && <p className="error-message">{vendorError}</p>}
//       {!selectedVendor && (
//         <>
//           {/* Display vendor list */}
//           <h2>Vendors in {categoryName}</h2>
//           {!loadingVendors && !vendorError && vendors.length === 0 && (
//             <p>No vendors available in this category.</p>
//           )}

//           <ul className="vendor-list">
//             {vendors.map(vendor => (
//               <li key={vendor._id} onClick={() => setSelectedVendor(vendor)}>
//                 {vendor.companyName}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//       {selectedVendor && (
//         <div className='deals'>
//           {/* Back to vendor list button */}
         
//         <div className='Heading-deal-list'>
//           <h3>Deals from {selectedVendor.companyName}</h3>
//           <button className="back-button" onClick={goBackToVendorList}>
//             Back to vendor list
//           </button>
//           </div>
//           {/* Loading state for deals */}
//           {loadingDeals && <p className="loading-message">Loading deals...</p>}

//           {/* Error message for deal fetching */}
//           {dealError && <p className="error-message">{dealError}</p>}

//           {/* Display deals */}
//           {!loadingDeals && !dealError && deals.length === 0 && (
//             <p>No deals available for this vendor.</p>
//           )}

//           <div className="deals-container">
//             {deals.map(deal => (
//               <div className="deal-box" key={deal._id}>
//                  <img
//                         src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
//                         alt="Profile"
//                         className="dealimages"
//                     />
//                 <h4>{deal.title}</h4>
//                 <p>{deal.description}</p>
//                 <p><strong>Original Price:</strong> {deal.originalPrice}</p>
//                 <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
//                 <p className="deal-box-footer">Valid until: {new Date(deal.validUntil).toLocaleDateString()}</p>
//                   <button className="avail-button" onClick={() => availDeal(deal._id)}>
//                   Avail Deal
//                   </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Vendors;
import React, { useState, useEffect } from 'react';
import { FiSearch, FiArrowLeft, FiShoppingBag, FiStar, FiClock, FiDollarSign } from 'react-icons/fi';
import './Vendor.css';

function Vendors({ categoryName }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [vendorError, setVendorError] = useState(null);
  const [dealError, setDealError] = useState(null);
  const [vendorSearchQuery, setVendorSearchQuery] = useState('');
  const [dealSearchQuery, setDealSearchQuery] = useState('');

  // Fetch vendors by specific Category
  useEffect(() => {
    if (categoryName) {
      setLoadingVendors(true);
      setVendorError(null);
      fetch(`http://localhost:1000/api/auth/vendors?category=${categoryName}`)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          setVendors(data);
          setLoadingVendors(false);
        })
        .catch(error => {
          setVendorError('Error fetching vendors: ' + error.message);
          setLoadingVendors(false);
        });
    }
  }, [categoryName]);

  // Fetch deals when a vendor is selected
  useEffect(() => {
    if (selectedVendor) {
      setLoadingDeals(true);
      setDealError(null);
      fetch(`http://localhost:1000/api/auth/deals/${selectedVendor._id}`)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          setDeals(data);
          setLoadingDeals(false);
        })
        .catch(error => {
          setDealError('Error fetching deals: ' + error.message);
          setLoadingDeals(false);
        });
    }
  }, [selectedVendor]);

  const filteredVendors = vendors.filter(vendor => 
    vendor.companyName.toLowerCase().includes(vendorSearchQuery.toLowerCase())
  );

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(dealSearchQuery.toLowerCase()) ||
    deal.description.toLowerCase().includes(dealSearchQuery.toLowerCase())
  );

  const availDeal = async (dealId) => {
    try {
      const studentId = localStorage.getItem('userid');
      const response = await fetch('http://localhost:1000/api/auth/avail-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, dealId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Deal availed successfully!');
      } else {
        alert(data.message || 'Failed to avail deal.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  const goBackToVendorList = () => {
    setSelectedVendor(null);
    setDeals([]);
  };

  return (
    <div className="vendors-container">
      {loadingVendors && <div className="loading-spinner"></div>}
      {vendorError && <p className="error-message">{vendorError}</p>}
      
      {!selectedVendor && (
        <>
          <div className="section-header">
            <h2 className="section-title">Premium {categoryName} Partners</h2>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                value={vendorSearchQuery}
                onChange={(e) => setVendorSearchQuery(e.target.value)}
                placeholder="Search luxury vendors..."
                className="search-input"
              />
            </div>
          </div>

          {!loadingVendors && !vendorError && vendors.length === 0 && (
            <p className="no-results">No premium vendors available in this category.</p>
          )}

          <div className="vendors-grid">
            {filteredVendors.map(vendor => (
              <div 
                key={vendor._id} 
                className="vendor-card"
                onClick={() => setSelectedVendor(vendor)}
              >
                <div className="vendor-image">
                  <img
                    src={`http://localhost:1000/${vendor.profilePhoto || '/default-profile.png'}`}
                    alt={vendor.companyName}
                  />
                </div>
                <div className="vendor-info">
                  <h3>{vendor.companyName}</h3>
                  <div className="vendor-rating">
                    <FiStar className="star-icon" />
                    <span>4.8</span>
                  </div>
                  <p className="vendor-category">{categoryName}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {selectedVendor && (
        <div className="deals-section">
          <div className="deals-header">
            <button className="back-button" onClick={goBackToVendorList}>
              <FiArrowLeft /> Back to Partners
            </button>
            <h2 className="vendor-deals-title">Exclusive Deals from {selectedVendor.companyName}</h2>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                value={dealSearchQuery}
                onChange={(e) => setDealSearchQuery(e.target.value)}
                placeholder="Search luxury deals..."
                className="search-input"
              />
            </div>
          </div>

          {loadingDeals && <div className="loading-spinner"></div>}
          {dealError && <p className="error-message">{dealError}</p>}
          {!loadingDeals && !dealError && deals.length === 0 && (
            <p className="no-results">No exclusive deals available from this partner.</p>
          )}

          <div className="deals-grid">
            {filteredDeals.map(deal => (
              <div className="deal-card" key={deal._id}>
                <div className="deal-image">
                  <img
                    src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
                    alt={deal.title}
                  />
                  <div className="deal-badge">-{deal.discountPercentage}%</div>
                </div>
                <div className="deal-content">
                  <h3>{deal.title}</h3>
                  <p className="deal-description">{deal.description}</p>
                  
                  <div className="deal-pricing">
                    <span className="original-price">PKR {deal.originalPrice}</span>
                    <span className="discounted-price">
                      PKR {(deal.originalPrice * (1 - deal.discountPercentage/100)).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="deal-meta">
                    <div className="meta-item">
                      <FiClock className="meta-icon" />
                      <span>Valid until: {new Date(deal.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="avail-button"
                    onClick={() => availDeal(deal._id)}
                  >
                    <FiShoppingBag /> Claim This Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Categories({ onSelectCategory }) {
  const categories = [
    { name: 'Eateries', icon: '🍽️', color: '#FF6B6B' },
    { name: 'Healthcare', icon: '🏥', color: '#4ECDC4' },
    { name: 'Fashion', icon: '👗', color: '#FF9F1C' },
    { name: 'Accommodations', icon: '🏨', color: '#6A4C93' },
    { name: 'Retail', icon: '🛍️', color: '#2EC4B6' }
  ];

  return (
    <div className="categories-section">
      <h2 className="section-title">Select a Category</h2>
      <p className="section-subtitle">Discover exclusive student discounts from Our partners</p>
      
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.name}
            className="category-card"
            onClick={() => onSelectCategory(category.name)}
            style={{ backgroundColor: category.color }}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
function DealsDiscounts() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="deals-page">
      <header className="deals-header">
        <h1 className="page-title">Premium Student Deals</h1>
        <p className="page-subtitle">Exclusive discounts from partners</p>
      </header>

      {!selectedCategory && <Categories onSelectCategory={setSelectedCategory} />}

      {selectedCategory && (
        <>
          {/* 🔙 Back Button */}
          <div className="back-to-categories">
            <button onClick={handleBackToCategories} className="back-button">
              <FiArrowLeft style={{ marginRight: '6px' }} />
              Back to Categories
            </button>
          </div>

          {/* Vendors for selected category */}
          <Vendors categoryName={selectedCategory} />
        </>
      )}
    </div>
  );
}

export default DealsDiscounts;