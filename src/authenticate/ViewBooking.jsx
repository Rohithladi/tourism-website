import React, { useState, useEffect} from 'react';
import axios from 'axios';

const ViewBooking = () => {
  const username = localStorage.getItem("username"); // Retrieve username from localStorage
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch email based on username
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:8080/api/users/email/${username}`)  // Fetch email based on username
        .then((response) => {
          setEmail(response.data); // Store email in state
        })
        .catch((error) => {
          console.error("There was an error fetching the email:", error);
        });
    }
  }, [username]);

  // Fetch booking details based on email
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/api/bookings/user/${email}`)  // Fetch bookings by email
        .then((response) => {
          setBookings(response.data); // Store bookings in state
          setLoading(false); // Set loading to false once bookings are fetched
        })
        .catch((error) => {
          console.error("There was an error fetching the bookings:", error);
          setLoading(false); // Stop loading on error
        });
    }
  }, [email]);

  if (loading) {
    return <div className="text-center text-xl">Loading your booking details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 animate__animated animate__fadeIn">Welcome, {username}!</h2>
      <p className="text-lg text-center text-gray-700 mb-8">Here are your bookings and travel details:</p>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-50 animate__animated animate__fadeInUp"
            >
              <h3 className="text-xl font-semibold text-blue-500 flex items-center space-x-2">
                <i className="fas fa-suitcase-rolling text-2xl"></i>
                <span>{booking.destination}</span>
              </h3>
              <p className="text-gray-600 mt-2"><strong>Guests:</strong> {booking.guests}</p>
              <p className="text-gray-600"><strong>Check-in:</strong> {booking.checkIn}</p>
              <p className="text-gray-600"><strong>Check-out:</strong> {booking.checkOut}</p>
              <p className="text-gray-600"><strong>Travel Type:</strong> {booking.travelType}</p>
              <p className="text-gray-600"><strong>Journey Type:</strong> {booking.journeyType}</p>
              <p className="text-gray-600"><strong>Payment Method:</strong> {booking.paymentMethod}</p>

              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200">
                  <i className="fas fa-check-circle mr-2"></i> Confirm
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200">
                  <i className="fas fa-times-circle mr-2"></i> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default ViewBooking;
