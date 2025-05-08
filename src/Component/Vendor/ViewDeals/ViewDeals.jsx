// import React, { useEffect, useState } from 'react';
// import './ViewDeals.css'; // Optional CSS for styling

// function ViewDeals() {
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch deals when the component mounts
//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:1000/api/auth/deals')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setDeals(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Error fetching deals: ' + error.message);
//         setLoading(false);
//       });
//   }, []);

//   // Delete deal function
//   const deleteDeal = async (dealId) => {
//     try {
//       const response = await fetch(`http://localhost:1000/api/auth/deals/${dealId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete the deal');
//       }
//       setDeals(deals.filter((deal) => deal._id !== dealId)); // Remove deleted deal from the list
//       alert('Deal deleted successfully!');
//     } catch (error) {
//       alert('Error deleting deal: ' + error.message);
//     }
//   };

//   return (
//     <div className="vendor-deals">
//       <h1>Vendor Deals</h1>
//       {loading && <p>Loading deals...</p>}
//       {error && <p className="error-message">{error}</p>}
//       {!loading && !error && deals.length === 0 && <p>No deals available.</p>}

//       <div className="deals-container">
//         {deals.map((deal) => (
//           <div className="deal-card" key={deal._id}>
//             <img
//               src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
//               alt="Deal"
//               className="deal-image"
//             />
//             <h3>{deal.title}</h3>
//             <p>{deal.description}</p>
//             <p>{deal.originalPrice}</p>
//             <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
//             <p><strong>Valid Until:</strong> {new Date(deal.validUntil).toLocaleDateString()}</p>
//             <button className="delete-button" onClick={() => deleteDeal(deal._id)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ViewDeals;

// import React, { useEffect, useState } from 'react';
// import './ViewDeals.css'; // Optional CSS for styling

// function ViewDeals() {
//   const [deals, setDeals] = useState([]); // Initialize as empty array
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch deals when the component mounts
//   useEffect(() => {
//     setLoading(true);
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage

//     fetch('http://localhost:1000/api/auth/deals', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token': token, // Include the token in the request headers
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setDeals(data || []); // Ensure deals is always an array
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Error fetching deals: ' + error.message);
//         setLoading(false);
//       });
//   }, []);

//   // Delete deal function
//   const deleteDeal = async (dealId) => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     try {
//       const response = await fetch(`http://localhost:1000/api/auth/deals/${dealId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': token, // Include the token in the request headers
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete the deal');
//       }
//       setDeals(deals.filter((deal) => deal._id !== dealId)); // Remove deleted deal from the list
//       alert('Deal deleted successfully!');
//     } catch (error) {
//       alert('Error deleting deal: ' + error.message);
//     }
//   };

//   return (
//     <div className="vendor-deals">
//       <h1>Vendor Deals</h1>
//       {loading && <p>Loading deals...</p>}
//       {error && <p className="error-message">{error}</p>}
//       {!loading && !error && deals.length === 0 && <p>No deals available.</p>}

//       <div className="deals-container">
//         {deals && deals.length > 0 ? (
//           deals.map((deal) => (
//             <div className="deal-card" key={deal._id}>
//               <img
//                 src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
//                 alt="Deal"
//                 className="deal-image"
//               />
//               <h3>{deal.title}</h3>
//               <p>{deal.description}</p>
//               <p>{deal.originalPrice}</p>
//               <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
//               <p><strong>Valid Until:</strong> {new Date(deal.validUntil).toLocaleDateString()}</p>
//               <button className="delete-button" onClick={() => deleteDeal(deal._id)}>
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No deals available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ViewDeals;

import React, { useEffect, useState } from 'react';
import './ViewDeals.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ViewDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }

    fetch('http://localhost:1000/api/auth/deals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDeals(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching deals: ' + err.message);
        setLoading(false);
      });
  };

  const startEditing = (deal) => {
    setEditingDeal(deal._id);
    setEditFormData({
      title: deal.title,
      description: deal.description,
      originalPrice: deal.originalPrice,
      discountPercentage: deal.discountPercentage,
      validUntil: new Date(deal.validUntil).toISOString().split('T')[0],
    });
    setEditImage(null);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditImage(e.target.files[0]);
  };

  const saveEdit = async (dealId) => {
    try {
      const formData = new FormData();
      for (const key in editFormData) {
        formData.append(key, editFormData[key]);
      }
      if (editImage) {
        formData.append('image', editImage);
      }

      const response = await fetch(`http://localhost:1000/api/auth/deals/${dealId}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setDeals((prev) =>
          prev.map((deal) =>
            deal._id === dealId
              ? { ...deal, ...editFormData, validUntil: new Date(editFormData.validUntil), image: data.deal.image }
              : deal
          )
        );
        setIsModalOpen(false);
        setEditingDeal(null);
        alert('Deal updated successfully!');
      } else {
        alert(data.error || 'Failed to update deal.');
      }
    } catch (error) {
      alert('Error updating deal: ' + error.message);
    }
  };

  const deleteDeal = async (dealId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:1000/api/auth/deals/${dealId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      if (!response.ok) throw new Error('Failed to delete the deal');
      setDeals((prev) => prev.filter((deal) => deal._id !== dealId));
      alert('Deal deleted successfully!');
    } catch (error) {
      alert('Error deleting deal: ' + error.message);
    }
  };

  return (
    <div className="vendor-deals">
      <h1>Manage Deals</h1>
      {loading && <p>Loading deals...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && deals.length === 0 && <p>No deals available.</p>}

      <div className="deals-container">
        {deals.map((deal) => (
          <div className="deal-card" key={deal._id}>
            <img
              src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
              alt="Deal"
              className="dealimages"
            />
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
            <p><strong>Price:</strong> {deal.originalPrice}</p>
            <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
            <p><strong>Valid Until:</strong> {new Date(deal.validUntil).toLocaleDateString()}</p>
            <div className="deal-actions">
              <button onClick={() => startEditing(deal)}>Edit</button>
              <button className="delete-button" onClick={() => deleteDeal(deal._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="edit-modal"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Deal</h2>
        <form>
          <label>Title:
            <input name="title" value={editFormData.title} onChange={handleEditInputChange} />
          </label>
          <label>Description:
            <textarea name="description" value={editFormData.description} onChange={handleEditInputChange} />
          </label>
          <label>Original Price:
            <input name="originalPrice" value={editFormData.originalPrice} onChange={handleEditInputChange} />
          </label>
          <label>Discount %:
            <input type="number" name="discountPercentage" value={editFormData.discountPercentage} onChange={handleEditInputChange} />
          </label>
          <label>Valid Until:
            <input type="date" name="validUntil" value={editFormData.validUntil} onChange={handleEditInputChange} />
          </label>
          <label>Change Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={() => saveEdit(editingDeal)}>Save</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ViewDeals;
