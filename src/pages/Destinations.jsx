// src/pages/Destinations.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../pages/Loaders'; // Import your loader component

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/destinations');
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDestinations();
  }, []);

  const handleLearnMore = (destinationId) => {
    console.log("Navigating to destination with ID:", destinationId); // Debugging line
    navigate(`/destination/${destinationId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    ); // Center the loader component
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-12">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
        Explore Amazing Destinations
      </h1>
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={`data:${destination.imageType};base64,${destination.imageData}`}
                alt={destination.title}
                className="w-full h-60 object-cover transition duration-300 hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{destination.title}</h2>
                  <p className="text-gray-300 mt-1">{destination.description}</p>
                  <button 
                    onClick={() => handleLearnMore(destination.id)}
                    className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
