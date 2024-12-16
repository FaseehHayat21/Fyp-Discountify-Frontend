import React, { useContext, useState, useEffect } from 'react';
import "./AddDealsVendor.css";
import { IoMdAdd } from "react-icons/io";
import registerContext from "../../context/Register/RegisterContext";
import { useNavigate } from 'react-router-dom';

export default function AddDealsVendor() {
    const navigate = useNavigate();
    const context = useContext(registerContext);
    const { addDeal } = context;

    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, [navigate]);

    const [deal, setDeal] = useState({
        title: "",
        description: "",
        originalPrice: "",
        discountPercentage: 0,
        validUntil: "",
        images: [], // Store multiple images
    });

    const handleClick = async (e) => {
        try{
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('title', deal.title);
        formData.append('description', deal.description);
        formData.append('originalPrice', deal.originalPrice);
        formData.append('discountPercentage', deal.discountPercentage);
        formData.append('validUntil', deal.validUntil);

        for (let i = 0; i < deal.images.length; i++) {
            formData.append('images', deal.images[i]); // Append images
        }

        addDeal(formData); 
        
        
            setDeal({
                title: "",
                description: "",
                originalPrice: "",
                discountPercentage: 0,
                validUntil: "",
                images: []
            });
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Failed to create deal. Try again.');
            alert(err)
        }
    };

    const onChange = (e) => {
        if (e.target.name === "images") {
            const filesArray = Array.from(e.target.files);
            setDeal({ ...deal, images: [...deal.images, ...filesArray] });
        } else {
            setDeal({ ...deal, [e.target.name]: e.target.value });
        }
    };

    return (
        <>
            <div className="add-post-container">
                <h2 className='mt-4 heading-add'>Create a New Deal</h2>
                <form className="my-3 post-form">
                    <div className='form-section'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Deal Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={deal.title} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" value={deal.description} onChange={onChange} required rows="5"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="originalPrice" className="form-label">Original Price</label>
                            <input type="number" className="form-control" id="originalPrice" name="originalPrice" value={deal.originalPrice} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
                            <input type="number" className="form-control" id="discountPercentage" name="discountPercentage" value={deal.discountPercentage} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validUntil" className="form-label">Valid Until</label>
                            <input type="date" className="form-control" id="validUntil" name="validUntil" value={deal.validUntil} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Upload Images</label>
                            <input type="file" className="form-control" id="images" name="images" onChange={onChange} multiple accept="image/*" />
                        </div>
                    </div>
                </form>
                {loading ? (
                    <p>Submitting deal...</p>
                ) : (
                    <button className="cssbuttons-io-button" type="submit" onClick={handleClick}>
                        <IoMdAdd />
                        <span>Create Deal</span>
                    </button>
                )}
                {error && <p className="error-text">{error}</p>}
            </div>
        </>
    );
}
