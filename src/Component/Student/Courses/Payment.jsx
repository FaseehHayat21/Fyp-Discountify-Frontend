import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('idr apni public key dalna');

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
      // Step 1: Create payment intent on server
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

      // Step 2: Confirm the payment with Stripe.js
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
        // Step 3: Complete enrollment
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
    <div className="payment-form-container bg-white rounded-lg shadow-sm p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Complete Your Purchase</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <p className="text-md font-medium">Amount: <span className="text-blue-700">${price}</span></p>
        <p className="text-xs text-gray-600">Course ID: {courseId}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 m-3">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 m-3">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 m-3">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 m-3">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Billing Address */}
        <div className="mt-4">
          <h3 className="text-md font-medium text-gray-700 mb-2 text-left">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 text-left">
              <label className="block text-sm font-medium text-gray-700 m-3">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 m-3">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 m-3">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 m-3">ZIP/Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-4">
          <h3 className="text-md font-medium text-gray-700 mb-2 text-left">Payment Information</h3>
          <div className="border p-3 rounded-md bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Card Details</label>
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
                    color: '#9e2146',
                  },
                },
              }}
              className="p-2"
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded relative text-sm" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-6 pt-2 border-t">
          <p className="text-xs text-gray-600">
            By completing this purchase, you agree to our terms of service
          </p>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!stripe || loading}
              className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-2.5 w-2.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="4"></circle>
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