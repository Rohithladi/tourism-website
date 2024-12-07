import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaPlane, FaUmbrellaBeach } from "react-icons/fa";
import { motion } from "framer-motion";

function PersonalDetails({ formData, setFormData }) {
  const [emailFetched, setEmailFetched] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username"); // Retrieve username from localStorage
    const fetchEmail = async () => {
      if (username) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/email/${username}`);
          setFormData((prevData) => ({ ...prevData, email: response.data }));
          setEmailFetched(true);
        } catch (error) {
          console.error("Error fetching email:", error);
        }
      }
    };

    fetchEmail();
  }, [setFormData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const username = localStorage.getItem("username"); // Retrieve username from localStorage
  //   if (username) {
  //     try {
  //       await axios.put(`http://localhost:8080/api/users/update/${username}`, formData);
  //       console.log("Form data updated successfully!");
  //     } catch (error) {
  //       console.error("Error updating form data:", error);
  //     }
  //   } else {
  //     console.error("Username not found in localStorage");
  //   }
  // };

  return (
    <div
      className="p-8 bg-cover bg-center rounded-lg shadow-md"
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
        Personal Details
      </motion.h2>

      <motion.div
        className="flex justify-center mb-6"
        initial={{ y: 20 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <FaUmbrellaBeach className="text-5xl text-indigo-500" />
      </motion.div>

      <div className="space-y-5">
        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaUser className="text-indigo-500 mr-3 animate-pulse" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </motion.div>

        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaEnvelope className="text-indigo-500 mr-3 animate-bounce" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            readOnly={emailFetched}
          />
        </motion.div>

        <motion.div
          className="flex items-center bg-white p-2 rounded-md shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaPhone className="text-indigo-500 mr-3 animate-spin-slow" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </motion.div>

        <motion.div className="mt-6 flex justify-center">
          {/* <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Save Changes
          </button> */}
        </motion.div>
      </div>
    </div>
  );
}

export default PersonalDetails;
