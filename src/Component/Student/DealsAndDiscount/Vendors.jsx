// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiArrowLeft, FiShoppingBag, FiStar, FiClock, FiDollarSign } from 'react-icons/fi';
// import './Vendor.css';

// function Vendors({ categoryName }) {
//   const [vendors, setVendors] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [deals, setDeals] = useState([]);
//   const [loadingVendors, setLoadingVendors] = useState(false);
//   const [loadingDeals, setLoadingDeals] = useState(false);
//   const [vendorError, setVendorError] = useState(null);
//   const [dealError, setDealError] = useState(null);
//   const [vendorSearchQuery, setVendorSearchQuery] = useState('');
//   const [dealSearchQuery, setDealSearchQuery] = useState('');

//   // Fetch vendors by specific Category
//   useEffect(() => {
//     if (categoryName) {
//       setLoadingVendors(true);
//       setVendorError(null);
//       fetch(`http://localhost:1000/api/auth/vendors?category=${categoryName}`)
//         .then(response => {
//           if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
//       setDealError(null);
//       fetch(`http://localhost:1000/api/auth/deals/${selectedVendor._id}`)
//         .then(response => {
//           if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

//   const filteredVendors = vendors.filter(vendor => 
//     vendor.companyName.toLowerCase().includes(vendorSearchQuery.toLowerCase())
//   );

//   const filteredDeals = deals.filter(deal => 
//     deal.title.toLowerCase().includes(dealSearchQuery.toLowerCase()) ||
//     deal.description.toLowerCase().includes(dealSearchQuery.toLowerCase())
//   );

//   const availDeal = async (dealId) => {
//     try {
//       const studentId = localStorage.getItem('userid');
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

//   const goBackToVendorList = () => {
//     setSelectedVendor(null);
//     setDeals([]);
//   };

//   return (
//     <div className="vendors-container">
//       {loadingVendors && <div className="loading-spinner"></div>}
//       {vendorError && <p className="error-message">{vendorError}</p>}
      
//       {!selectedVendor && (
//         <>
//           <div className="section-header">
//             <h2 className="section-title">Premium {categoryName} Partners</h2>
//             <div className="search-bar">
//               <FiSearch className="search-icon" />
//               <input
//                 type="text"
//                 value={vendorSearchQuery}
//                 onChange={(e) => setVendorSearchQuery(e.target.value)}
//                 placeholder="Search luxury vendors..."
//                 className="search-input"
//               />
//             </div>
//           </div>

//           {!loadingVendors && !vendorError && vendors.length === 0 && (
//             <p className="no-results">No premium vendors available in this category.</p>
//           )}

//           <div className="vendors-grid">
//             {filteredVendors.map(vendor => (
//               <div 
//                 key={vendor._id} 
//                 className="vendor-card"
//                 onClick={() => setSelectedVendor(vendor)}
//               >
//                 <div className="vendor-image">
//                   <img
//                     src={`http://localhost:1000/${vendor.profilePhoto || '/default-profile.png'}`}
//                     alt={vendor.companyName}
//                   />
//                 </div>
//                 <div className="vendor-info">
//                   <h3>{vendor.companyName}</h3>
//                   <div className="vendor-rating">
//                     <FiStar className="star-icon" />
//                     <span>4.8</span>
//                   </div>
//                   <p className="vendor-category">{categoryName}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
      
//       {selectedVendor && (
//         <div className="deals-section">
//           <div className="deals-header">
//             <button className="back-button" onClick={goBackToVendorList}>
//               <FiArrowLeft /> Back to Partners
//             </button>
//             <h2 className="vendor-deals-title">Exclusive Deals from {selectedVendor.companyName}</h2>
//             <div className="search-bar">
//               <FiSearch className="search-icon" />
//               <input
//                 type="text"
//                 value={dealSearchQuery}
//                 onChange={(e) => setDealSearchQuery(e.target.value)}
//                 placeholder="Search luxury deals..."
//                 className="search-input"
//               />
//             </div>
//           </div>

//           {loadingDeals && <div className="loading-spinner"></div>}
//           {dealError && <p className="error-message">{dealError}</p>}
//           {!loadingDeals && !dealError && deals.length === 0 && (
//             <p className="no-results">No exclusive deals available from this partner.</p>
//           )}

//           <div className="deals-grid">
//             {filteredDeals.map(deal => (
//               <div className="deal-card" key={deal._id}>
//                 <div className="deal-image">
//                   <img
//                     src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
//                     alt={deal.title}
//                   />
//                   <div className="deal-badge">-{deal.discountPercentage}%</div>
//                 </div>
//                 <div className="deal-content">
//                   <h3>{deal.title}</h3>
//                   <p className="deal-description">{deal.description}</p>
                  
//                   <div className="deal-pricing">
//                     <span className="original-price">PKR {deal.originalPrice}</span>
//                     <span className="discounted-price">
//                       PKR {(deal.originalPrice * (1 - deal.discountPercentage/100)).toFixed(2)}
//                     </span>
//                   </div>
                  
//                   <div className="deal-meta">
//                     <div className="meta-item">
//                       <FiClock className="meta-icon" />
//                       <span>Valid until: {new Date(deal.validUntil).toLocaleDateString()}</span>
//                     </div>
//                   </div>
                  
//                   <button 
//                     className="avail-button"
//                     onClick={() => availDeal(deal._id)}
//                   >
//                     <FiShoppingBag /> Claim This Deal
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function Categories({ onSelectCategory }) {
//   const categories = [
//     { name: 'Eateries', icon: '🍽️', color: '#FF6B6B' },
//     { name: 'Healthcare', icon: '🏥', color: '#4ECDC4' },
//     { name: 'Fashion', icon: '👗', color: '#FF9F1C' },
//     { name: 'Accommodations', icon: '🏨', color: '#6A4C93' },
//     { name: 'Retail', icon: '🛍️', color: '#2EC4B6' }
//   ];

//   return (
//     <div className="categories-section">
//       <h2 className="section-title">Select a Category</h2>
//       <p className="section-subtitle">Discover exclusive student discounts from Our partners</p>
      
//       <div className="categories-grid">
//         {categories.map(category => (
//           <div 
//             key={category.name}
//             className="category-card"
//             onClick={() => onSelectCategory(category.name)}
//             style={{ backgroundColor: category.color }}
//           >
//             <div className="category-icon">{category.icon}</div>
//             <h3>{category.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// function DealsDiscounts() {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleBackToCategories = () => {
//     setSelectedCategory(null);
//   };

//   return (
//     <div className="deals-page">
//       <header className="deals-header">
//         <h1 className="page-title">Premium Student Deals</h1>
//         <p className="page-subtitle">Exclusive discounts from partners</p>
//       </header>

//       {!selectedCategory && <Categories onSelectCategory={setSelectedCategory} />}

//       {selectedCategory && (
//         <>
//           {/* 🔙 Back Button */}
//           <div className="back-to-categories">
//             <button onClick={handleBackToCategories} className="back-button">
//               <FiArrowLeft style={{ marginRight: '6px' }} />
//               Back to Categories
//             </button>
//           </div>

//           {/* Vendors for selected category */}
//           <Vendors categoryName={selectedCategory} />
//         </>
//       )}
//     </div>
//   );
// }

// export default DealsDiscounts;


import React, { useState, useEffect } from 'react';
import { FiSearch, FiArrowLeft, FiShoppingBag, FiStar, FiClock, FiDollarSign, FiX, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import './Vendor.css';

// Add the DealPopup component
const DealPopup = ({ deal, vendor, onClose, onConfirm }) => {
  const [option, setOption] = useState(null);
  const [address, setAddress] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Here you would typically reverse geocode to get an address
          // For now we'll just show coordinates
          setAddress(`Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`);
          setIsGettingLocation(false);
        },
        (error) => {
          setLocationError("Couldn't get your location. Please enter manually.");
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
    }
  };

  const handleConfirm = () => {
    if (option === 'delivery' && !address.trim()) {
      setLocationError('Please provide a delivery address');
      return;
    }
    onConfirm(option, address);
  };

  return (
    <div className="deal-popup-overlay">
      <div className="deal-popup">
        <button className="close-popup" onClick={onClose}>
          <FiX />
        </button>
        
        <div className="popup-header">
          <h3>{deal.title}</h3>
          <p className="vendor-name">{vendor.companyName}</p>
          <div className="deal-price">
            <span className="original-price">PKR {deal.originalPrice}</span>
            <span className="discounted-price">
              PKR {(deal.originalPrice * (1 - deal.discountPercentage/100)).toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="delivery-options">
          <h4>Select Option</h4>
          <div className="option-buttons">
            <button 
              className={`option-btn ${option === 'takeaway' ? 'selected' : ''}`}
              onClick={() => setOption('takeaway')}
            >
              Takeaway
            </button>
            <button 
              className={`option-btn ${option === 'delivery' ? 'selected' : ''}`}
              onClick={() => setOption('delivery')}
            >
              Delivery
            </button>
          </div>
        </div>
        
        {option === 'delivery' && (
          <div className="delivery-address">
            <h4>Delivery Address</h4>
            <div className="location-input">
              <button 
                className="get-location-btn"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
              >
                <FiMapPin /> {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
              </button>
              {locationError && <p className="error-text">{locationError}</p>}
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address"
              rows="3"
            />
          </div>
        )}
        
        <button 
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={!option || (option === 'delivery' && !address.trim())}
        >
          <FiCheckCircle /> Confirm Order
        </button>
      </div>
    </div>
  );
}; 

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
  const [showDealPopup, setShowDealPopup] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

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

  const handleDealClick = (deal) => {
    setSelectedDeal(deal);
    setShowDealPopup(true);
  };

  const handleDealConfirmation = async (option, address) => {
    try {
      const studentId = localStorage.getItem('userid');
      const response = await fetch('http://localhost:1000/api/auth/avail-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          studentId, 
          dealId: selectedDeal._id,
          option, // 'takeaway' or 'delivery'
          ...(option === 'delivery' && { deliveryAddress: address })
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Deal availed successfully!');
        setShowDealPopup(false);
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
                  <p><strong>City:</strong> {vendor.city}</p>
                  <p><strong>Address:</strong> {vendor.companyAddress}</p>
                  <p><strong>Contact:</strong> {vendor.phoneNumber}</p>
                  <p><strong>Delivery:</strong> {vendor.providesDelivery ? 'Yes' : 'No'}</p>
                  <p><strong>Takeaway:</strong> {vendor.providesTakeaway ? 'Yes' : 'No'}</p>  
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
                    onClick={() => handleDealClick(deal)}
                  >
                    <FiShoppingBag /> Claim This Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDealPopup && selectedDeal && (
        <DealPopup 
          deal={selectedDeal}
          vendor={selectedVendor}
          onClose={() => setShowDealPopup(false)}
          onConfirm={handleDealConfirmation}
        />
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