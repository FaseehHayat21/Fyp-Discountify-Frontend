import React, { useEffect, useState } from 'react';
import './ViewDeals.css'; // Optional CSS for styling

function ViewDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch deals when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:1000/api/auth/deals')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching deals: ' + error.message);
        setLoading(false);
      });
  }, []);

  // Delete deal function
  const deleteDeal = async (dealId) => {
    try {
      const response = await fetch(`http://localhost:1000/api/auth/deals/${dealId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the deal');
      }
      setDeals(deals.filter((deal) => deal._id !== dealId)); // Remove deleted deal from the list
      alert('Deal deleted successfully!');
    } catch (error) {
      alert('Error deleting deal: ' + error.message);
    }
  };

  return (
    <div className="vendor-deals">
      <h1>Vendor Deals</h1>
      {loading && <p>Loading deals...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && deals.length === 0 && <p>No deals available.</p>}

      <div className="deals-container">
        {deals.map((deal) => (
          <div className="deal-card" key={deal._id}>
            <img
              src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
              alt="Deal"
              className="deal-image"
            />
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
            <p>{deal.originalPrice}</p>
            <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
            <p><strong>Valid Until:</strong> {new Date(deal.validUntil).toLocaleDateString()}</p>
            <button className="delete-button" onClick={() => deleteDeal(deal._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDeals;
