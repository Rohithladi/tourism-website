import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPlaneDeparture, FaCreditCard } from "react-icons/fa";
import Loader from './Loader';
import './summary.css';

function Summary({ formData, totalPrice }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/thankyou");
    }, 3000);
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between p-6 space-y-8 relative bg-gray-50">
      {loading && (
        <div className="absolute inset-0 bg-white flex justify-center items-center z-50 opacity-90">
          <Loader />
        </div>
      )}
      <div className={`transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Booking Summary</h2>

        {/* Personal Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-blue-500 flex items-center">
            <FaUser className="mr-2 text-blue-600" /> Personal Details
          </h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
        </div>

        {/* Travel Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="font-bold text-xl text-blue-500 flex items-center">
            <FaPlaneDeparture className="mr-2 text-blue-600" /> Travel Details
          </h3>
          <p><strong>Number of Guests:</strong> {formData.guests}</p>
          <p><strong>Check-In:</strong> {formData.checkIn}</p>
          <p><strong>Check-Out:</strong> {formData.checkOut}</p>
          <p><strong>Type of Travel:</strong> {formData.travelType}</p>
          <p><strong>Type of Journey:</strong> {formData.journeyType}</p>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="font-bold text-xl text-green-500 flex items-center">
            <FaCreditCard className="mr-2 text-green-600" /> Payment Method
          </h3>
          <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
          {formData.paymentMethod === "credit" && (
            <div>
              <p><strong>Card Number:</strong> {formData.cardNumber}</p>
              <p><strong>Expiry Date:</strong> {formData.expiryDate}</p>
              <p><strong>CVV:</strong> {formData.cvv}</p>
            </div>
          )}
          {formData.paymentMethod === "debit" && (
            <div>
              <p><strong>Debit Card Number:</strong> {formData.debitCardNumber}</p>
              <p><strong>Expiry Date:</strong> {formData.debitExpiryDate}</p>
              <p><strong>CVV:</strong> {formData.debitCvv}</p>
            </div>
          )}
          {formData.paymentMethod === "upi" && (
            <div>
              <p><strong>UPI ID:</strong> {formData.upiId}</p>
            </div>
          )}
        </div>

        {/* Total Price */}
        {/* <div className="bg-white shadow-lg rounded-md p-4 mt-6">
          <h3 className="text-xl font-bold text-indigo-700">Booking Summary</h3>
          <p className="text-lg text-gray-800">Total Price: ₹{totalPrice}</p>
        </div> */}

        <div className="text-center mt-6">
          <button
            onClick={handleConfirmBooking}
            className="px-8 py-3 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
