// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlaneDeparture, FaUmbrellaBeach, FaMountain, FaLandmark, FaHiking, FaShip, FaCameraRetro, FaSpa } from 'react-icons/fa';
import bgImage from '../images/bg.jpg';


function Home() {
  return (
    <div className="relative bg-cover bg-center p-8 min-h-screen flex flex-col items-center text-white" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-transparent opacity-80 blur-sm" aria-hidden="true"></div>

      <div className="flex justify-between items-center w-full mb-6 relative z-10">
        <h1 className="text-5xl font-extrabold mr-auto tracking-wide animate-bounce">Explore</h1>
        <div className="ml-auto flex space-x-6 text-lg font-medium">
          <Link to="/packages" className="text-white hover:text-yellow-300">Packages</Link>
          <Link to="/contact" className="text-white hover:text-yellow-300">Contact</Link>
          <Link to="/map" className="text-white hover:text-yellow-300">Interactive Map</Link>
          <Link to="/signup" className="text-white hover:text-yellow-300">Signup</Link>

        </div>
      </div>

      <div className="text-center mt-12 mb-8 relative z-10">
        <h2 className="text-6xl font-bold tracking-wide text-yellow-300 drop-shadow-lg animate-pulse">Discover the World</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto text-gray-100 opacity-90">
          Dive into unforgettable journeys, experience breathtaking places, and create lifelong memories.
        </p>
      </div>

     <section className="mt-12 relative z-10">
  <h3 className="text-4xl font-bold text-white mb-6 tracking-wide">
    🌎 Explore Top Destinations
  </h3>
  <ul className="flex flex-wrap justify-center gap-6">
    <li
      className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-500 flex-none w-48 p-6"
    >
      <h4 className="text-2xl font-bold text-yellow-400">🌍 Paris</h4>
      <p className="text-gray-300 mt-2">The City of Light</p>
    </li>
    <li
      className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-500 flex-none w-48 p-6"
    >
      <h4 className="text-2xl font-bold text-yellow-400">🏖️ Bali</h4>
      <p className="text-gray-300 mt-2">The Island of Gods</p>
    </li>
    <li
      className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-500 flex-none w-48 p-6"
    >
      <h4 className="text-2xl font-bold text-yellow-400">🗻 Tokyo</h4>
      <p className="text-gray-300 mt-2">Tradition & Modernity</p>
    </li>
    <li
      className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-500 flex-none w-48 p-6"
    >
      <h4 className="text-2xl font-bold text-yellow-400">🌄 New York</h4>
      <p className="text-gray-300 mt-2">The City That Never Sleeps</p>
    </li>
  </ul>
</section>

<section className="mt-16 relative z-10 text-center">
  <h3 className="text-4xl font-bold text-white mb-8 tracking-wide">
    🌟 Popular Travel Themes
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-700 to-blue-900 p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-500">
      <FaPlaneDeparture className="text-6xl text-yellow-300 animate-spin-slow hover:animate-bounce" />
      <h4 className="text-2xl font-bold text-yellow-300 mt-4">Adventure</h4>
      <p className="text-gray-200 mt-2">
        Explore thrilling adventures and adrenaline-pumping experiences.
      </p>
    </div>
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-700 to-blue-900 p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-500">
      <FaUmbrellaBeach className="text-6xl text-yellow-300 hover:animate-bounce" />
      <h4 className="text-2xl font-bold text-yellow-300 mt-4">Beach</h4>
      <p className="text-gray-200 mt-2">
        Relax at serene beaches with clear waters and golden sands.
      </p>
    </div>
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-700 to-blue-900 p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-500">
      <FaMountain className="text-6xl text-yellow-300 hover:animate-bounce" />
      <h4 className="text-2xl font-bold text-yellow-300 mt-4">Mountain</h4>
      <p className="text-gray-200 mt-2">
        Discover breathtaking mountain landscapes and hidden trails.
      </p>
    </div>
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-700 to-blue-900 p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-500">
      <FaLandmark className="text-6xl text-yellow-300 hover:animate-bounce" />
      <h4 className="text-2xl font-bold text-yellow-300 mt-4">Historical</h4>
      <p className="text-gray-200 mt-2">
        Immerse yourself in history with tours of ancient landmarks.
      </p>
    </div>
  </div>
</section>

<section className="mt-16 text-center relative z-10">
  <h3 className="text-4xl font-bold text-white mb-8 tracking-wide">
    ✨ Special Offers & Deals
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-gradient-to-r from-purple-600 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500">
      <h4 className="text-2xl font-bold text-yellow-400">Weekend Getaway</h4>
      <p className="text-gray-200 mt-2">
        Enjoy exclusive discounts on weekend travel packages.
      </p>
    </div>
    <div className="bg-gradient-to-r from-purple-600 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500">
      <h4 className="text-2xl font-bold text-yellow-400">Family Vacation</h4>
      <p className="text-gray-200 mt-2">
        Book a family vacation and get up to 20% off.
      </p>
    </div>
    <div className="bg-gradient-to-r from-purple-600 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500">
      <h4 className="text-2xl font-bold text-yellow-400">Honeymoon Package</h4>
      <p className="text-gray-200 mt-2">
        Make your honeymoon special with our curated packages.
      </p>
    </div>
  </div>
</section>

<section className="mt-16 text-center">
  <h3 className="text-4xl font-bold text-white mb-8 tracking-wide">
    💬 Traveler Testimonials
  </h3>
  <div className="flex flex-wrap justify-center gap-8">
    <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-left">
      <p className="text-gray-100 italic">
        "Exploring Bali was a dream come true! Amazing experience!"
      </p>
      <p className="text-yellow-300 font-semibold mt-4">- John Doe</p>
    </div>
    <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-left">
      <p className="text-gray-100 italic">
        "The best travel service with unbeatable deals!"
      </p>
      <p className="text-yellow-300 font-semibold mt-4">- Sarah Lee</p>
    </div>
  </div>
</section>


      <section className="mt-16 relative z-10 text-center">
        <h3 className="text-3xl font-semibold text-white mb-8">Travel Themes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaPlaneDeparture className="text-5xl text-yellow-300 animate-spin-slow hover:animate-bounce" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Adventure</h4>
            <p className="text-gray-100 mt-2">Explore thrilling adventures and adrenaline-pumping experiences.</p>
          </div>
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaUmbrellaBeach className="text-5xl text-yellow-300 hover:animate-bounce transition duration-300" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Beach</h4>
            <p className="text-gray-100 mt-2">Relax at serene beaches with clear waters and golden sands.</p>
          </div>
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaMountain className="text-5xl text-yellow-300 hover:animate-bounce transition duration-300" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Mountain</h4>
            <p className="text-gray-100 mt-2">Discover breathtaking mountain landscapes and hidden trails.</p>
          </div>
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaLandmark className="text-5xl text-yellow-300 hover:animate-bounce transition duration-300" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Historical</h4>
            <p className="text-gray-100 mt-2">Immerse yourself in history with tours of ancient landmarks.</p>
          </div>
        </div>
      </section>

      {/* Trending Activities */}
      <section className="mt-16 relative z-10 text-center">
        <h3 className="text-3xl font-semibold text-white mb-8">Trending Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaHiking className="text-5xl text-yellow-300 animate-bounce" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Hiking</h4>
            <p className="text-gray-100 mt-2">Climb the peaks and conquer new heights.</p>
          </div>
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaShip className="text-5xl text-yellow-300 animate-spin-slow" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Cruises</h4>
            <p className="text-gray-100 mt-2">Sail across serene waters and luxury cruises.</p>
          </div>
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaCameraRetro className="text-5xl text-yellow-300 animate-pulse" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Photography</h4>
            <p className="text-gray-100 mt-2">Capture the beauty of nature and urban sceneries.</p>
          </div>
          <div className="flex flex-col items-center bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaSpa className="text-5xl text-yellow-300 animate-bounce" />
            <h4 className="text-2xl font-semibold text-yellow-300 mt-4">Spa</h4>
            <p className="text-gray-100 mt-2">Relax and rejuvenate with world-class spa treatments.</p>
          </div>
        </div>
      </section>

      <section className="mt-16 text-center relative z-10">
        <h3 className="text-3xl font-semibold text-white mb-6">Why Choose Us?</h3>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <div className="bg-gradient-to-b from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h4 className="text-2xl font-bold text-yellow-300">Unforgettable Experiences</h4>
            <p className="text-gray-100 mt-2">Unique destinations, guided tours, and cultural immersion.</p>
          </div>
          <div className="bg-gradient-to-b from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h4 className="text-2xl font-bold text-yellow-300">Seamless Booking</h4>
            <p className="text-gray-100 mt-2">Effortless booking with secure and reliable services.</p>
          </div>
          <div className="bg-gradient-to-b from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h4 className="text-2xl font-bold text-yellow-300">Expert Guides</h4>
            <p className="text-gray-100 mt-2">Experienced guides who enrich your travel with insights.</p>
          </div>
        </div>
      </section>
      {/* Customer Reviews */}
      <section className="mt-16 relative z-10">
        <h3 className="text-3xl font-semibold text-white text-center mb-8">Customer Reviews</h3>
        <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory">
          <div className="bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg snap-center">
            <p className="text-gray-100 italic">"The best travel experience of my life!"</p>
            <h4 className="mt-4 font-semibold text-yellow-300">- John Doe</h4>
          </div>
          <div className="bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg snap-center">
            <p className="text-gray-100 italic">"Amazing destinations and perfect planning."</p>
            <h4 className="mt-4 font-semibold text-yellow-300">- Sarah Lee</h4>
          </div>
          <div className="bg-blue-800 bg-opacity-80 p-6 rounded-lg shadow-lg snap-center">
            <p className="text-gray-100 italic">"Truly unforgettable memories, thanks to your team!"</p>
            <h4 className="mt-4 font-semibold text-yellow-300">- Chris Wong</h4>
          </div>
        </div>
      </section>


      <div className="mt-12 text-center relative z-10">
        <Link
          to="/signup"
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-110 transition duration-500 ease-in-out relative overflow-hidden"
        >
          <span className="relative z-10">✨ Start Your Adventure ✨</span>
          <span className="absolute inset-0 bg-yellow-300 opacity-30 rounded-full animate-ping"></span>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">"The journey of a thousand miles begins with a single step."</h2>
        <p className="text-lg text-gray-700 overflow-hidden whitespace-nowrap border-r-2 border-black w-[20ch] animate-typing">

        </p>
      </div>
    </div>


  );
}

export default Home;
