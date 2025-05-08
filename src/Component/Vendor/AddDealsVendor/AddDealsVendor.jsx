// import React, { useContext, useState, useEffect } from 'react';
// import "./AddDealsVendor.css";
// import { IoMdAdd } from "react-icons/io";
// import registerContext from "../../../context/Register/RegisterContext";
// import { useNavigate } from 'react-router-dom';

// export default function AddDealsVendor() {
//     const navigate = useNavigate();
//     const context = useContext(registerContext);
//     const { addDeal } = context;

//     const [loading, setLoading] = useState(false); // Loading state
//     const [error, setError] = useState(null); // Error state

//     useEffect(() => {
//         if (!localStorage.getItem('token')) {
//             navigate("/login");
//         }
//     }, [navigate]);

//     const [deal, setDeal] = useState({
//         title: "",
//         description: "",
//         originalPrice: "",
//         discountPercentage: 0,
//         validUntil: "",
//         images: [], // Store multiple images
//     });

//     const handleClick = async (e) => {
//         try{
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append('title', deal.title);
//         formData.append('description', deal.description);
//         formData.append('originalPrice', deal.originalPrice);
//         formData.append('discountPercentage', deal.discountPercentage);
//         formData.append('validUntil', deal.validUntil);

//         for (let i = 0; i < deal.images.length; i++) {
//             formData.append('images', deal.images[i]); // Append images
//         }

//         addDeal(formData); 
        
        
//             setDeal({
//                 title: "",
//                 description: "",
//                 originalPrice: "",
//                 discountPercentage: 0,
//                 validUntil: "",
//                 images: []
//             });
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             setError('Failed to create deal. Try again.');
//             alert(err)
//         }
//     };

//     const onChange = (e) => {
//         if (e.target.name === "images") {
//             const filesArray = Array.from(e.target.files);
//             setDeal({ ...deal, images: [...deal.images, ...filesArray] });
//         } else {
//             setDeal({ ...deal, [e.target.name]: e.target.value });
//         }
//     };

//     return (
//         <>
//             <div className="add-post-containers">
//                 <h2 className='mt-4 heading-add'>Create a New Deal</h2>
//                 <form className="my-3 post-form">
//                     <div className='form-section'>
//                         <div className="mb-3">
//                             <label htmlFor="title" className="form-label">Deal Title</label>
//                             <input type="text" className="form-control" id="title" name="title" value={deal.title} onChange={onChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="description" className="form-label">Description</label>
//                             <textarea className="form-control" id="description" name="description" value={deal.description} onChange={onChange} required rows="5"></textarea>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="originalPrice" className="form-label">Original Price</label>
//                             <input type="number" className="form-control" id="originalPrice" name="originalPrice" value={deal.originalPrice} onChange={onChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
//                             <input type="number" className="form-control" id="discountPercentage" name="discountPercentage" value={deal.discountPercentage} onChange={onChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="validUntil" className="form-label">Valid Until</label>
//                             <input type="date" className="form-control" id="validUntil" name="validUntil" value={deal.validUntil} onChange={onChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="images" className="form-label">Upload Images</label>
//                             <input type="file" className="form-control" id="images" name="images" onChange={onChange} multiple accept="image/*" />
//                         </div>
//                     </div>
//                 </form>
//                 {loading ? (
//                     <p>Submitting deal...</p>
//                 ) : (
//                     <button className="cssbuttons-io-button" type="submit" onClick={handleClick}>
//                         <IoMdAdd />
//                         <span>Create Deal</span>
//                     </button>
//                 )}
//                 {error && <p className="error-text">{error}</p>}
//             </div>
//         </>
//     );
// }



import React, { useContext, useState, useEffect } from 'react';
import { FiPlusCircle, FiUpload, FiDollarSign, FiPercent, FiCalendar, FiImage } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import registerContext from "../../../context/Register/RegisterContext";
import { useNavigate } from 'react-router-dom';
import './AddDealsVendor.css';

export default function AddDealsVendor() {
    const navigate = useNavigate();
    const context = useContext(registerContext);
    const { addDeal } = context;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);

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
        images: [],
    });

    const handleClick = async (e) => {
        try {
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
                formData.append('images', deal.images[i]);
            }

            await addDeal(formData);
            
            setDeal({
                title: "",
                description: "",
                originalPrice: "",
                discountPercentage: 0,
                validUntil: "",
                images: []
            });
            setPreviewImages([]);
            setLoading(false);
            
            // Show success message
            alert('Deal created successfully!');
            
        } catch (err) {
            setLoading(false);
            setError('Failed to create deal. Please try again.');
            console.error(err);
        }
    };

    const onChange = (e) => {
        if (e.target.name === "images") {
            const filesArray = Array.from(e.target.files);
            setDeal({ ...deal, images: [...deal.images, ...filesArray] });
            
            // Create preview URLs
            const previewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewImages([...previewImages, ...previewUrls]);
        } else {
            setDeal({ ...deal, [e.target.name]: e.target.value });
        }
    };

    const removeImage = (index) => {
        const newImages = [...deal.images];
        newImages.splice(index, 1);
        setDeal({ ...deal, images: newImages });
        
        const newPreviews = [...previewImages];
        newPreviews.splice(index, 1);
        setPreviewImages(newPreviews);
    };

    return (
        <div className="luxury-deal-container">
            <div className="luxury-deal-card">
                <h2 className="luxury-deal-title">
                    <span className="gradient-text">Create Exclusive Deal</span>
                </h2>
                <p className="luxury-deal-subtitle">Offer premium discounts to attract students</p>
                
                <form className="luxury-deal-form">
                    <div className="form-group luxury-form-group">
                        <label className="luxury-label">
                            <FiPlusCircle className="input-icon" />
                            Deal Title
                        </label>
                        <input
                            type="text"
                            className="luxury-input"
                            name="title"
                            value={deal.title}
                            onChange={onChange}
                            placeholder="Enter deal title"
                            required
                        />
                    </div>
                    
                    <div className="form-group luxury-form-group">
                        <label className="luxury-label">
                            <FiPlusCircle className="input-icon" />
                            Description
                        </label>
                        <textarea
                            className="luxury-textarea"
                            name="description"
                            value={deal.description}
                            onChange={onChange}
                            placeholder="Describe your exclusive offer"
                            required
                            rows="5"
                        ></textarea>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group luxury-form-group">
                            <label className="luxury-label">
                                <FiDollarSign className="input-icon" />
                                Original Price
                            </label>
                            <input
                                type="number"
                                className="luxury-input"
                                name="originalPrice"
                                value={deal.originalPrice}
                                onChange={onChange}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        
                        <div className="form-group luxury-form-group">
                            <label className="luxury-label">
                                <FiPercent className="input-icon" />
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                className="luxury-input"
                                name="discountPercentage"
                                value={deal.discountPercentage}
                                onChange={onChange}
                                placeholder="0"
                                required
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group luxury-form-group">
                        <label className="luxury-label">
                            <FiCalendar className="input-icon" />
                            Valid Until
                        </label>
                        <input
                            type="date"
                            className="luxury-input"
                            name="validUntil"
                            value={deal.validUntil}
                            onChange={onChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group luxury-form-group">
                        <label className="luxury-label">
                            <FiImage className="input-icon" />
                            Upload Images
                        </label>
                        <div className="image-upload-container">
                            <label htmlFor="images" className="upload-label">
                                <FiUpload className="upload-icon" />
                                <span>Select Images</span>
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    onChange={onChange}
                                    multiple
                                    accept="image/*"
                                    className="hidden-input"
                                />
                            </label>
                            
                            {previewImages.length > 0 && (
                                <div className="image-preview-grid">
                                    {previewImages.map((preview, index) => (
                                        <div key={index} className="image-preview-item">
                                            <img src={preview} alt={`Preview ${index}`} />
                                            <button 
                                                type="button" 
                                                className="remove-image-btn"
                                                onClick={() => removeImage(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        {loading ? (
                            <button className="luxury-submit-btn" type="button" disabled>
                                <div className="loading-spinner"></div>
                                Creating Deal...
                            </button>
                        ) : (
                            <button className="luxury-submit-btn" type="submit" onClick={handleClick}>
                                <IoMdAdd className="submit-icon" />
                                <span>Create Premium Deal</span>
                            </button>
                        )}
                        
                        {error && <p className="luxury-error-message">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}