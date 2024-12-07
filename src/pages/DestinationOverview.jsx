import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DestinationOverview = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/destination/${destinationId}`);
        setDestination(response.data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      }
    };
    fetchDestination();
  }, [destinationId]);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  if (!destination) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-16 overflow-hidden">
      {/* Banner Section */}
      <div
        className="w-full h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(data:${destination.imageType};base64,${destination.imageData})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-60"></div>
        <h1 className="text-5xl font-bold text-center pt-24 text-gray-900 z-10" data-aos="fade-down">
          {destination.title}
        </h1>
      </div>

      {/* Destination Highlights Section */}
      <div className="container mx-auto px-6 text-gray-800 z-10 mt-8">
        <div className="text-center max-w-4xl mx-auto text-lg lg:text-xl text-gray-700 px-4 md:px-8 mb-8" data-aos="fade-up">
          <p>{destination.description}</p>
        </div>

        {/* Highlights of Destination */}
        <div className="text-center mb-16" data-aos="fade-right">
          <h2 className="text-4xl font-semibold mb-6 text-blue-500 tracking-wider">Top Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-gray-800">
            <Feature icon="🌄" label="Breathtaking Views" description="Experience panoramic vistas and scenic landscapes." />
            <Feature icon="🍽️" label="Gourmet Cuisine" description="Savor exquisite dishes made by world-renowned chefs." />
            <Feature icon="🎢" label="Adventure Activities" description="Enjoy thrilling rides and outdoor adventures." />
            <Feature icon="🎨" label="Cultural Experiences" description="Dive into rich cultural heritage and traditions." />
            <Feature icon="🛒" label="Shopping Hubs" description="Explore vibrant markets and luxury boutiques." />
          </div>
        </div>

        {/* Best Seasons to Visit */}
        <div className="text-center mt-20 mb-16" data-aos="fade-left">
          <h2 className="text-4xl font-semibold mb-8 text-green-500">Best Seasons to Visit</h2>
          <div className="flex justify-center gap-8">
            <SeasonCard season="Spring" description="Perfect weather for scenic hikes and flower festivals." />
            <SeasonCard season="Summer" description="Enjoy beach activities, nightlife, and warm weather." />
            <SeasonCard season="Autumn" description="A beautiful season for photography and wine tours." />
            <SeasonCard season="Winter" description="Ideal for skiing, holiday markets, and cozy cafes." />
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="text-center mt-20 mb-16" data-aos="zoom-in">
          <h2 className="text-4xl font-semibold mb-6 text-purple-500">Customer Reviews</h2>
          <div className="flex flex-col lg:flex-row justify-center gap-10">
            <ReviewCard 
              name="Alice" 
              feedback="An unforgettable experience! The views were stunning, and the local food was amazing." 
              rating={5} 
            />
            <ReviewCard 
              name="John" 
              feedback="A perfect vacation spot with so much to explore and do. Highly recommended!" 
              rating={4} 
            />
            <ReviewCard 
              name="Sophia" 
              feedback="Loved every moment. Perfect for a family getaway!" 
              rating={5} 
            />
          </div>
        </div>

        {/* Booking Button */}
        <div className="flex justify-center mt-12" data-aos="zoom-in">
          <button
            className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
            onClick={() => navigate('/booking')} // Use navigate to go to the booking page
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Feature Component with Hover Effect
const Feature = ({ icon, label, description }) => (
  <div className="relative flex flex-col items-center text-center transform transition duration-300 hover:scale-110 group">
    <span className="text-5xl animate-bounce mb-2" data-aos="flip-left">{icon}</span>
    <h3 className="text-xl font-semibold tracking-wider">{label}</h3>
    
    {/* Hover content */}
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white shadow-lg rounded-lg p-4 w-48 text-gray-800 z-20">
      <p>{description}</p>
    </div>
  </div>
);

// SeasonCard Component for Seasons to Visit
const SeasonCard = ({ season, description }) => (
  <div className="bg-white rounded-lg p-6 w-48 text-gray-800 text-center shadow-lg transform transition duration-500 hover:scale-105">
    <h3 className="text-2xl font-bold mb-2">{season}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// ReviewCard Component for Customer Reviews
const ReviewCard = ({ name, feedback, rating }) => (
  <div className="bg-white rounded-lg p-6 w-64 text-gray-800 text-center shadow-lg">
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600 mb-2">"{feedback}"</p>
    <div className="text-yellow-400">
      {'⭐'.repeat(rating)}{rating < 5 ? '☆'.repeat(5 - rating) : ''}
    </div>
  </div>
);

export default DestinationOverview;
