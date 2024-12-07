// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-transparent p-4 fixed w-full z-10"> {/* Make background transparent and fixed */}
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Tourism</h1> {/* Increase text size and bold */}
        <div className="space-x-6">
          {/* Add padding to links for better spacing */}
          <Link className="text-white hover:underline text-lg transition duration-300" to="/">Home</Link>
          <Link className="text-white hover:underline text-lg transition duration-300" to="/destinations">Destinations</Link>
          <Link className="text-white hover:underline text-lg transition duration-300" to="/bookings">Bookings</Link>
          <Link className="text-white hover:underline text-lg transition duration-300" to="/contact">Contact</Link>
          <Link className="text-white hover:underline text-lg transition duration-300" to="/about">About Us</Link>
          <Link className="text-white hover:underline text-lg transition duration-300" to="/gallery">Gallery</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
