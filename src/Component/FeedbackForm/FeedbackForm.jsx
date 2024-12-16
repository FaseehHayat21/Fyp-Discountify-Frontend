import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const feedback = {
            rating,
            comments,
            name,
            email,
            date: new Date().toISOString(),
        };

        const response = await fetch("http://localhost:1000/api/auth/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(feedback),  // Send as JSON
        });

        if (response.ok) {
            setSuccessMessage("Thank you for your feedback!");
            setRating(0);
            setComments("");
            setName("");
            setEmail("");
        } else {
            setSuccessMessage("Failed to submit feedback. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting feedback:", error);
        setSuccessMessage("Failed to submit feedback. Please try again.");
    }
};

  return (
    <div className="feedback-form-container">
      <h2>Leave Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="feedback-rating">
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="feedback-comments">
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="5"
            required
          />
        </div>

        <div className="feedback-name">
          <label>Name (Optional):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="feedback-email">
          <label>Email (Optional):</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default FeedbackForm;
