import React, { useState, useEffect } from "react";
import { FaPlane, FaSuitcase, FaHotel, FaCar, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function TravelDetails({ formData, handleChange }) {
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to calculate the total price based on preferences
  useEffect(() => {
    const calculatePrice = () => {
      let price = 0;

      // Base price per guest
      const guestPrice = 100;
      price += (formData.guests || 0) * guestPrice;

      if (formData.travelType === "Adventure") price += 300;
      if (formData.travelType === "Business") price += 400;
      if (formData.travelType === "Leisure") price += 200;
      if (formData.travelType === "Family") price += 250;

      // Additional costs for journey type
      if (formData.journeyType === "One Way") price += 100;
      if (formData.journeyType === "Round Trip") price += 200;
      if (formData.journeyType === "Multi City") price += 500;

      // Additional costs for hotel rating
      if (formData.hotelRating === "1 Star") price += 50;
      if (formData.hotelRating === "2 Stars") price += 100;
      if (formData.hotelRating === "3 Stars") price += 150;
      if (formData.hotelRating === "4 Stars") price += 200;
      if (formData.hotelRating === "5 Stars") price += 300;

      // Additional costs for transport mode
      if (formData.transportMode === "Flight") price += 500;
      if (formData.transportMode === "Train") price += 100;
      if (formData.transportMode === "Bus") price += 50;
      if (formData.transportMode === "Car") price += 200;

      setTotalPrice(price);
    };

    calculatePrice();
  }, [formData, setTotalPrice]);

  return (
    <div
      className="p-8 bg-cover bg-center rounded-lg shadow-md"
      style={{ backgroundImage: `url('/images/bg.jpg')` }}
    >
      <motion.div
        className="flex justify-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <FaPlane className="text-5xl text-indigo-500" />
      </motion.div>

      <motion.h2
        className="text-4xl font-bold text-center mb-6 text-white shadow-lg backdrop-blur-sm bg-indigo-700/30 rounded-lg p-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Travel Details
      </motion.h2>

      <div className="space-y-5">
        {/* Number of Guests */}
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaSuitcase className="text-indigo-500 mr-3 animate-pulse" />
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Number of Guests"
          />
        </motion.div>

        {/* Check-In Date */}
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaCalendarAlt className="text-indigo-500 mr-3 animate-bounce" />
          <input
            type="date"
            name="checkIn"
            placeholder="Check-In Date"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Check-In Date"
          />
        </motion.div>

        {/* Check-Out Date */}
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaCalendarAlt className="text-indigo-500 mr-3 animate-bounce" />
          <input
            type="date"
            name="checkOut"
            placeholder="Check-Out Date"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Check-Out Date"
          />
        </motion.div>

        {/* Travel Type */}
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaSuitcase className="text-indigo-500 mr-3 animate-pulse" />
          <select
            name="travelType"
            value={formData.travelType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Select Travel Type"
          >
            <option value="">Select Travel Type</option>
            <option value="Adventure">Adventure</option>
            <option value="Business">Business</option>
            <option value="Leisure">Leisure</option>
            <option value="Family">Family</option>
          </select>
        </motion.div>

        {/* Journey Type */}
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FaCar className="text-indigo-500 mr-3 animate-pulse" />
          <select
            name="journeyType"
            value={formData.journeyType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Select Journey Type"
          >
            <option value="">Select Journey Type</option>
            <option value="One Way">One Way</option>
            <option value="Round Trip">Round Trip</option>
            <option value="Multi City">Multi City</option>
          </select>
        </motion.div>

        {/* Hotel Rating */}
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FaHotel className="text-indigo-500 mr-3 animate-pulse" />
          <select
            name="hotelRating"
            value={formData.hotelRating}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Select Hotel Rating"
          >
            <option value="">Select Hotel Rating</option>
            <option value="1 Star">1 Star</option>
            <option value="2 Stars">2 Stars</option>
            <option value="3 Stars">3 Stars</option>
            <option value="4 Stars">4 Stars</option>
            <option value="5 Stars">5 Stars</option>
          </select>
        </motion.div>

        <div className="bg-white shadow-lg rounded-md p-4 mt-6">
          <p className="text-lg text-gray-800">Total Price: ₹{totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default TravelDetails;
