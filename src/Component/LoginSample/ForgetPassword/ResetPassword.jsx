import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthForms.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  // In ResetPassword.js, make sure to include userType if needed
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  if (newPassword !== confirmPassword) {
    setError("Passwords don't match");
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('http://localhost:1000/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token, 
        newPassword,
        // Include userType if your backend needs it
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to reset password');
    }

    alert('Password reset successfully!');
    // Redirect to appropriate login based on userType
    navigate(`/${data.userType.toLowerCase()}/login`); 
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <p>Enter your new password</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
            <small>Must be at least 8 characters with 1 number and 1 capital letter</small>
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          
          <button className='stp-button' type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;