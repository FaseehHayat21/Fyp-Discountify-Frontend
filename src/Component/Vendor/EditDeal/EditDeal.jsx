import React, { useEffect, useState } from 'react';
import './EditDeal.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EditDeal() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editImage, setEditImage] = useState(null); // State for the uploaded image
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
    // Check if token is available
    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }
  
    fetch('http://localhost:1000/api/auth/deals', {
      method: 'GET',
      headers: {
       'Content-Type': 'application/json',
        'auth-token': token, // Include the token in the request headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDeals(data); // Set the deals from the response
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching deals: ' + error.message);
        setLoading(false);
      });
  }, []);

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
      formData.append('title', editFormData.title);
      formData.append('description', editFormData.description);
      formData.append('originalPrice', editFormData.originalPrice);
      formData.append('discountPercentage', editFormData.discountPercentage);
      formData.append('validUntil', editFormData.validUntil);

      // Append image if a new image was uploaded
      if (editImage) {
        formData.append('image', editImage);
      }

      const response = await fetch(`http://localhost:1000/api/auth/deals/${dealId}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setDeals(
          deals.map((deal) =>
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

  return (
    <div className="vendor-deals">
      <h1>Vendor Deals</h1>
      {loading && <p>Loading deals...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && deals.length === 0 && <p>No deals available.</p>}

      <div className="deals-container">
        {deals.map((deal) => (
          <div className="deal-card-ve" key={deal._id}>
            <img
              src={`http://localhost:1000/${deal.images || '/default-profile.png'}`}
              alt="Deal"
              className="dealimages"
            />
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
            <p>{deal.originalPrice}</p>
            <p><strong>Discount:</strong> {deal.discountPercentage}%</p>
            <p><strong>Valid Until:</strong> {new Date(deal.validUntil).toLocaleDateString()}</p>
            <button onClick={() => startEditing(deal)}>Edit</button>
          </div>
        ))}
      </div>

      {/* Modal for editing deals */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="edit-modal"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Deal</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleEditInputChange}
              placeholder="Title"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditInputChange}
              placeholder="Description"
            />
          </label>
          <label>
          Original Price:
            <input
              name="originalPrice"
              value={editFormData.originalPrice}
              onChange={handleEditInputChange}
              placeholder="originalPrice"
            />
          </label>
          <label>
            Discount Percentage:
            <input
              type="number"
              name="discountPercentage"
              value={editFormData.discountPercentage}
              onChange={handleEditInputChange}
              placeholder="Discount Percentage"
            />
          </label>
          <label>
            Valid Until:
            <input
              type="date"
              name="validUntil"
              value={editFormData.validUntil}
              onChange={handleEditInputChange}
            />
          </label>
          <label>
            Change Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={() => saveEdit(editingDeal)}>
              Save
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditDeal;
