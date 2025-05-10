import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css'; // Import the CSS file

const stripePromise = loadStripe('pk_test_51Qa9fxAiC6YRjnLoY5FQRsW0CeeYcDXUAhPBKokqQ6xMjNSYR5IG4c98FNtgBljb190SM7U4b56MExFXgi8xbz6x00RJYnrjyH');

const CheckoutForm = ({ courseId, price, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const intentResponse = await axios.post(
        'http://localhost:1000/api/payment/create-payment-intent',
        { courseId },
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        }
      );
      
      const clientSecret = intentResponse.data.clientSecret;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode
            }
          }
        }
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        await axios.post(
          'http://localhost:1000/api/payment/confirm-payment',
          {
            paymentIntentId: paymentIntent.id,
            courseId
          },
          {
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          }
        );
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during payment processing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form__container">
      <h2 className="payment-form__header">Complete Your Purchase</h2>
      
      <div className="payment-form__amount-display">
        <p className="payment-form__amount-text">
          Amount: <span className="payment-form__amount-value">PKR {price}</span>
        </p>
        <p className="payment-form__course-id">Course ID: {courseId}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="payment-form__form">
        <div className="payment-form__grid">
          <div className="payment-form__input-group">
            <label className="payment-form__label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="payment-form__input"
              required
            />
          </div>
          
          <div className="payment-form__input-group">
            <label className="payment-form__label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="payment-form__input"
              required
            />
          </div>
          
          <div className="payment-form__input-group">
            <label className="payment-form__label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="payment-form__input"
              required
            />
          </div>
          
          <div className="payment-form__input-group">
            <label className="payment-form__label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="payment-form__input"
              required
            />
          </div>
        </div>

        <div className="payment-form__billing-section">
          <h3 className="payment-form__section-title">Billing Address</h3>
          <div className="payment-form__grid">
            <div className="payment-form__input-group md:col-span-2">
              <label className="payment-form__label">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="payment-form__input"
                required
              />
            </div>
            
            <div className="payment-form__input-group">
              <label className="payment-form__label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="payment-form__input"
                required
              />
            </div>
            
            <div className="payment-form__input-group">
              <label className="payment-form__label">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="payment-form__input"
                required
              />
            </div>
            
            <div className="payment-form__input-group">
              <label className="payment-form__label">ZIP/Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="payment-form__input"
                required
              />
            </div>
          </div>
        </div>

        <div className="payment-form__billing-section">
          <h3 className="payment-form__section-title">Payment Information</h3>
          <div className="payment-form__card-container">
            <label className="payment-form__label">Card Details</label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </div>
        
        {error && (
          <div className="payment-form__error-message">
            {error}
          </div>
        )}
        
        <div className="payment-form__footer">
          <p className="payment-form__terms">
            By completing this purchase, you agree to our terms of service
          </p>
          
          <div className="payment-form__button-group">
            <button
              type="button"
              onClick={onCancel}
              className="payment-form__button payment-form__button--cancel"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!stripe || loading}
              className="payment-form__button payment-form__button--submit"
            >
              {loading ? (
                <>
                  <svg className="payment-form__spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Complete Payment'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Payment = ({ courseId, price, onSuccess, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        courseId={courseId} 
        price={price} 
        onSuccess={onSuccess} 
        onCancel={onCancel} 
      />
    </Elements>
  );
};

export default Payment;