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
import './Vendor.css'; // Importing the Deals.css file

function Vendors({ categoryName }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [vendorError, setVendorError] = useState(null);
  const [dealError, setDealError] = useState(null);
  const [vendorSearchQuery, setVendorSearchQuery] = useState(''); // Search state for vendors
  const [dealSearchQuery, setDealSearchQuery] = useState(''); // Search state for deals

  // Fetch vendors by specific Category
  useEffect(() => {
    if (categoryName) {
      setLoadingVendors(true);
      setVendorError(null); // Reset error state before fetching
      fetch(`http://localhost:1000/api/auth/vendors?category=${categoryName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
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
      setDealError(null); // Reset error state before fetching
      fetch(`http://localhost:1000/api/auth/deals/${selectedVendor._id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
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

  // Handle vendor search query
  const filteredVendors = vendors.filter(vendor => 
    vendor.companyName.toLowerCase().includes(vendorSearchQuery.toLowerCase())
  );

  // Handle deal search query
  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(dealSearchQuery.toLowerCase()) ||
    deal.description.toLowerCase().includes(dealSearchQuery.toLowerCase())
  );

  // Handle availing a deal
  const availDeal = async (dealId) => {
    try {
      const studentId = localStorage.getItem('userid'); // Replace with the actual logged-in student's ID
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

  // Reset the selected vendor to go back to the vendor list
  const goBackToVendorList = () => {
    setSelectedVendor(null);
    setDeals([]); // Clear the deals when going back
  };

  return (
    <div>
      {loadingVendors && <p className="loading-message">Loading vendors...</p>}
      {vendorError && <p className="error-message">{vendorError}</p>}
      {!selectedVendor && (
        <>
          <h2>Vendors in {categoryName}</h2>
          {/* Vendor search input */}
          <input
            type="text"
            value={vendorSearchQuery}
            onChange={(e) => setVendorSearchQuery(e.target.value)}
            placeholder="Search vendors"
            className="search-input"
          />
          {!loadingVendors && !vendorError && vendors.length === 0 && (
            <p>No vendors available in this category.</p>
          )}

          <ul className="vendor-list">
            {filteredVendors.map(vendor => (
              <li key={vendor._id} onClick={() => setSelectedVendor(vendor)}>
                {vendor.companyName}
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedVendor && (
        <div className='deals'>
          <div className='Heading-deal-list'>
            <h3>Deals from {selectedVendor.companyName}</h3>
            <button className="back-button" onClick={goBackToVendorList}>
              Back to vendor list
            </button>
          </div>
          {/* Deal search input */}
          <input
            type="text"
            value={dealSearchQuery}
            onChange={(e) => setDealSearchQuery(e.target.value)}
            placeholder="Search deals"
            className="search-input"
          />
          {loadingDeals && <p className="loading-message">Loading deals...</p>}
          {dealError && <p className="error-message">{dealError}</p>}
          {!loadingDeals && !dealError && deals.length === 0 && (
            <p>No deals available for this vendor.</p>
          )}

          <div className="deals-container">
            {filteredDeals.map(deal => (
              <div className="deal-box" key={deal._id}>
                <img
                  src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
                  alt="Deal"
                  className="dealimages"
                />
                <h4>{deal.title}</h4>
                <p>{deal.description}</p>
                <p><strong>Original Price:</strong> {deal.originalPrice}</p>
                <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
                <p className="deal-box-footer">Valid until: {new Date(deal.validUntil).toLocaleDateString()}</p>
                <button className="avail-button" onClick={() => availDeal(deal._id)}>
                  Avail Deal
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendors;
