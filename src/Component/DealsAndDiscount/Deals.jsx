import React, { useState, useEffect } from 'react';

function Deals({ vendorId }) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (vendorId) {
      fetch(`/api/deals/${vendorId}`)
        .then(response => response.json())
        .then(data => setDeals(data))
        .catch(error => console.error('Error fetching deals:', error));
    }
  }, [vendorId]);

  return (
    <div>
      <h2>Deals</h2>
      <ul>
        {deals.map(deal => (
          <li key={deal._id}>
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
            <p>Discount: {deal.discountPercentage}%</p>
            <p>Valid Until: {new Date(deal.validUntil).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deals;
