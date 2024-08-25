import React, { useState, useEffect } from 'react';

function Vendors({ categoryName }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [deals, setDeals] = useState([]);

  // Fetch vendors when category changes
  useEffect(() => {
    if (categoryName) {
      fetch(`http://localhost:1000/api/auth/vendors?category=${categoryName}`)
        .then(response => response.json())
        .then(data => setVendors(data))
        .catch(error => console.error('Error fetching vendors:', error));
    }
  }, [categoryName]);

  // Fetch deals when a vendor is selected
  useEffect(() => {
    if (selectedVendor) {
      fetch(`http://localhost:1000/api/auth/deals/${selectedVendor._id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setDeals(data))
            .catch(error => console.error('Error fetching deals:', error));
    }
  }, [selectedVendor]);

  return (
    <div>
      <h2>Vendors in {categoryName}</h2>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor._id} onClick={() => setSelectedVendor(vendor)}>
            {vendor.companyName}
          </li>
        ))}
      </ul>

      {selectedVendor && (
        <div>
          <h3>Deals from {selectedVendor.companyName}</h3>
          <ul>
            {deals.map(deal => (
              <li key={deal._id}>
                <strong>{deal.title}</strong>: {deal.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Vendors;
