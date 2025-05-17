import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthForms.css';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get both email and userType from location state
  const { email, userType } = location.state || {};

  // Redirect if email or userType is missing
  useEffect(() => {
    if (!email || !userType) {
      navigate('/forgot-password');
    }
  }, [email, userType, navigate]);

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timer === 0) {
      setError('OTP has expired');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:1000/api/auth/verify-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          otp,
          userType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      navigate('/reset-password', { 
        state: { 
          token: data.token,
          userType: data.userType 
        } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:1000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }

      // Reset timer to 5 minutes
      setTimer(300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Verify OTP</h2>
        <p>Enter the 6-digit OTP sent to {email}</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            <div className="timer">Time remaining: {formatTime(timer)}</div>
          </div>
          
          <button className='stp-button' type="submit" disabled={loading || timer === 0}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        
        <div className="auth-footer">
          Didn't receive OTP? 
          <button 
            className="resend-link" 
            onClick={handleResendOTP}
            disabled={loading || timer > 0}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;