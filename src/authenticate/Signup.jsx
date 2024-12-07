import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/bg.jpg';
import overlayImage from '../images/map.jpg';
import { FaPlane, FaHotel, FaUtensils, FaLandmark } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        username,
        email,
        password,
      });
      
      if (response.status === 200) {
        setWelcomeMessage(`Welcome, ${username}!`);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Error registering user:', err);
      setError('There was an error registering the user!');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-500 to-green-500 opacity-70 animate-pulse"></div>
      <div className="absolute inset-0 flex justify-around items-center">
        <FaPlane className="text-red-500 text-5xl animate-bounce duration-1000" />
        <FaHotel className="text-yellow-500 text-5xl animate-bounce duration-1000 delay-150" />
        <FaUtensils className="text-green-500 text-5xl animate-bounce duration-1000 delay-300" />
        <FaLandmark className="text-blue-500 text-5xl animate-bounce duration-1000 delay-450" />
      </div>

      <div
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-lg w-full mx-4 transform transition duration-500 hover:scale-105 hover:shadow-xl"
        style={{
          backgroundImage: `url(${overlayImage}), linear-gradient(to bottom right, rgba(255, 255, 255, 0.6), rgba(230, 230, 250, 0.6))`,
          backgroundBlendMode: 'overlay, normal',
        }}
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          Sign Up
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Join us to start your adventure!
        </p>

        {welcomeMessage ? (
          <p className="text-center text-green-500 text-xl font-semibold mb-6">
            {welcomeMessage}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300 hover:border-blue-500"
                  placeholder="Enter your username"
                />
                <AiOutlineUser className="absolute right-3 top-3 text-gray-500 animate-bounce" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300 hover:border-blue-500"
                  placeholder="Enter your email"
                />
                <AiOutlineMail className="absolute right-3 top-3 text-gray-500 animate-bounce" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300 hover:border-blue-500"
                  placeholder="Create a password"
                />
                <AiOutlineLock className="absolute right-3 top-3 text-gray-500 animate-bounce" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-600 transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Sign Up
            </button>
          </form>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4">
            {error}
          </p>
        )}
        
        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
