// src/authenticate/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlane, FaGlobe, FaCalendarAlt, FaBlog, FaSun, FaSuitcase, FaMapMarkedAlt, FaCloudSun } from 'react-icons/fa';
import bgImage from '../images/bg.jpg';
import Travel from '../images/Travel.jpg';
import axios from 'axios'; // Import axios
const Dashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(''); // State to store city name
  const [budget, setBudget] = useState({ total: '', spent: '', remaining: '' });
  const username = localStorage.getItem("username"); // Retrieve username from localStorage

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For handling errors
  const [flipped, setFlipped] = useState(false);



  const handleClick = async () => {

    console.log('Searching for username:', username);
    setLoading(true);
    setError(""); // Reset previous error messages
    setFlipped(!flipped);

    try {
      const response = await axios.get(`http://localhost:8080/api/users/${username}`);

      // If the response is successful, set the user details
      setUserDetails(response.data);
      setFlipped((prevFlipped) => !prevFlipped); // Toggle the card flip state
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found!"); // Handle user not found error
      } else {
        setError("An error occurred while fetching data."); // Handle other errors
      }
      setUserDetails(null); // Reset previous user details
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const getTravelTip = (temperature) => {
    if (temperature > 30) {
      return "Perfect for a beach day! Don't forget your sunscreen.";
    } else if (temperature > 20) {
      return "Great weather for a hike or outdoor picnic!";
    } else if (temperature > 10) {
      return "Perfect time for a cozy coffee at a local cafe.";
    } else if (temperature > 0) {
      return "Ideal for a visit to a museum or indoor attraction.";
    } else {
      return "Stay warm! Consider indoor activities or a spa day.";
    }
  };

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a49e8e83381f5bccf9aaaa15a12624ed&units=metric`);
      const data = await response.json();
      if (data.main) {
        setWeather(data);
      } else {
        alert('City not found. Please try again.'); // Alert for invalid city
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };



  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  // Budget calculator logic
  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudget((prevState) => {
      const newBudget = { ...prevState, [name]: value };
      newBudget.remaining = newBudget.total - newBudget.spent; // Recalculate remaining
      return newBudget;
    });
  };

  // Handle reset action
  const handleReset = () => {
    setBudget({
      total: 0,
      spent: 0,
      remaining: 0,
    });
  };



  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600 opacity-80"></div>

      {/* Main Content */}
      <div className="relative z-10 py-12 px-4 flex flex-col items-center text-white">
        <h1 className="text-5xl font-bold mb-6 text-center animate-fade-in-down">
          Welcome, {username}!
        </h1>
        <p className="text-gray-200 mb-8 text-center text-lg animate-fade-in-up">
          Explore your travel options and make the most of our exclusive deals
        </p>

        {/* Weather Widget */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 max-w-md text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-cover" style={{ backgroundImage: Travel }}></div>
          <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2 relative z-10">
            <FaSun className="text-yellow-300 animate-spin" /> <span>Current Weather</span>
          </h2>
          <form onSubmit={handleCitySubmit} className="flex mb-4 relative z-10">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter your destination"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
            <button
              type="submit"
              className="ml-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-r-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out flex items-center"
            >
              <FaCloudSun className="mr-1" /> {/* Add an icon to the button */}
              Get Weather
            </button>
          </form>
          {weather ? (
            <>
              <div className="mb-4 relative z-10">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="w-20 h-20 mx-auto animate-bounce"
                />
              </div>
              <p className="text-xl font-bold text-center relative z-10">{weather.name}, {weather.sys.country}</p>
              <p className="text-4xl font-bold text-center relative z-10">{Math.round(weather.main.temp)}°C</p>
              <p className="capitalize text-center mb-2 relative z-10">{weather.weather[0].description}</p>
              <p className="text-center relative z-10">Humidity: {weather.main.humidity}%</p>
              <p className="text-center relative z-10">Wind Speed: {weather.wind.speed} m/s</p>
              <p className="text-center mt-4 relative z-10">
                <span className="font-semibold">Travel Tip:</span> {getTravelTip(weather.main.temp)}
              </p>
            </>
          ) : (
            <p className="text-center relative z-10">Enter a city to get the weather!</p>
          )}
        </div>


        {/* Actionable Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fade-in-up">

          <Link to="/ViewBooking" className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-white">
            <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2">
              <FaGlobe /> <span>View Bookings</span>
            </h2>
            <p>Check your travel bookings and itineraries to stay updated on your journey.</p>
          </Link>


          <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-white">
            <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2">
              <FaPlane /> <span>Explore Packages</span>
            </h2>
            <p>Discover exclusive travel packages tailored for your next adventure!</p>
          </div>
          <div className="relative w-80 h-48" style={{ perspective: "1000px" }}>
            <div
              className={`relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}

              style={{ transformStyle: "preserve-3d" }}
              onClick={handleClick}
            >
              {/* Card Wrapper */}
              <div
                className="absolute w-full h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-white"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-white backface-hidden">
                  <h2 className="text-2xl font-semibold mb-2 flex items-center space-x-2">
                    <FaCalendarAlt /> <span>Manage Profile</span>
                  </h2>
                  <p>Update your personal information, preferences, and account details.</p>
                  {loading && <p className="mt-4 animate-pulse">Loading...</p>} {/* Show loading state */}
                  {error && <p className="mt-4 text-red-500">{error}</p>} {/* Show error message */}
                </div>

                {/* Back Side */}
                {userDetails && (
                  <div className="absolute w-full h-full bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg shadow-lg p-6 backface-hidden transform rotate-y-180">
                    <h3 className="text-xl font-medium mb-2">User Details</h3>
                    <p className="font-semibold">Name: {userDetails.username}</p>
                    <p className="font-semibold">Email: {userDetails.email}</p>
                    <p className="font-semibold">Password: ********</p>
                  </div>
                )}
                {/* <div className="flex space-x-4 mt-4">
            <FaUserAlt className="text-xl animate-pulse" />
            <FaCog className="text-xl animate-spin" />
          </div> */}
              </div>
            </div>
          </div>
          <Link to="/blog" className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-white flex flex-col">
            <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2">
              <FaBlog /> <span>Travel Blog</span>
            </h2>
            <p>Explore tips, stories, and guides to make your trips unforgettable.</p>
          </Link>
          <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-white">
            <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2">
              <FaSuitcase /> <span>Travel Insurance</span>
            </h2>
            <p>Secure your trips with comprehensive travel insurance options.</p>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-white">
            <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2">
              <FaMapMarkedAlt /> <span>Destination Guides</span>
            </h2>
            <p>Your complete guide to top travel destinations and hidden gems.</p>
          </div>
        </div>


        {/* Call-to-Action Buttons */}
        <div className="mt-20 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/destinations')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition shadow-lg hover:shadow-xl"
          >
            View Destinations
          </button>
          <button
            onClick={() => navigate('/packages')}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-green-700 hover:to-green-600 transition shadow-lg hover:shadow-xl"
          >
            Explore Packages
          </button>
        </div>

        {/* Travel Budget Calculator */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-6 mt-10 max-w-xs text-white relative">
          <h2 className="text-3xl font-semibold mb-3 flex items-center space-x-2">
            <span>Budget Calculator</span>
            <span className="animate-bounce">💰</span>
          </h2>
          <div className="mb-4 relative group">
            <label htmlFor="total" className="block mb-1">Total Budget:</label>
            <input
              type="number"
              name="total"
              id="total"
              value={budget.total}
              onChange={handleBudgetChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              placeholder="Enter total budget"
            />
            <span className="absolute top-0 right-0 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition duration-300">
              💡 Enter your overall budget.
            </span>
          </div>
          <div className="mb-4 relative group">
            <label htmlFor="spent" className="block mb-1">Spent:</label>
            <input
              type="number"
              name="spent"
              id="spent"
              value={budget.spent}
              onChange={handleBudgetChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              placeholder="Enter spent amount"
            />
            <span className="absolute top-0 right-0 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition duration-300">
              💡 Enter how much you've spent.
            </span>
          </div>
          <div className="my-4">
            <div className="relative h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((budget.spent / budget.total) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-sm mt-1">
              {Math.min((budget.spent / budget.total) * 100, 100).toFixed(1)}% of your budget used
            </p>
          </div>
          <p
            className={`font-semibold text-lg ${budget.remaining < 0 ? 'text-red-500' : 'text-green-300'
              }`}
          >
            Remaining Budget: {budget.remaining || 0}
          </p>
          <button
            onClick={handleReset}
            className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-2 rounded shadow-lg transition duration-300 transform hover:scale-105"
          >
            Reset Budget
          </button>
        </div>


        {/* Additional Sections after scrolling */}
        <div className="relative z-10 py-16 px-4">
          {/* Popular Destinations Section */}
          <section className="my-12 max-w-6xl mx-auto bg-gradient-to-br from-blue-300 to-indigo-200 rounded-lg shadow-lg p-8 hover:shadow-2xl transition">
            <h2 className="text-4xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Destination Cards */}
              {["Paris, France", "Tokyo, Japan", "New York, USA"].map((destination, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-green-100 to-blue-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 group overflow-hidden"
                >
                  {/* Moving Plane Icon */}
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 animate-plane text-6xl text-white group-hover:animate-none transition-all">
                    ✈️
                  </span>

                  {/* Title with animated text */}
                  <h3 className="text-3xl font-semibold text-white mb-4 text-center animate__animated animate__fadeIn animate__delay-1s">
                    {destination}
                  </h3>

                  {/* Description with smooth fade-in */}
                  <p className="text-gray-800 text-center animate__animated animate__fadeIn animate__delay-2s">
                    Experience the beauty and culture of {destination}.
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => alert('Exploring more!')}  // Placeholder for some action
                    className="mt-4 inline-block bg-gradient-to-r from-teal-300 to-green-300 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gradient-to-r hover:from-teal-400 hover:to-green-400 text-lg"
                  >
                    Explore More
                  </button>
                </div>
              ))}
            </div>

            {/* Scroll to Top Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-gradient-to-r from-teal-300 to-green-300 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all"
              >
                Scroll to Top
              </button>
            </div>
          </section>


          {/* Tailwind Config for Custom Animation */}
          <style jsx="true" global="true">
            {`
  /* Plane Animation: Moves from left to right */
  @keyframes planeAnimation {
    0% {
      left: -100px;
    }
    50% {
      left: 50%;
      transform: translateX(-50%);
    }
    100% {
      left: 100%;
    }
  }

  .animate-plane {
    animation: planeAnimation 5s linear infinite;
  }
`}
          </style>

        </div>


        {/* Top Deals Section */}
        <section className="my-12 max-w-6xl mx-auto bg-gradient-to-br from-teal-400 via-green-300 to-lime-200 rounded-lg shadow-xl p-8 hover:shadow-2xl transition">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center tracking-tight">Top Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Deal Card 1 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🏖️</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Weekend Getaway</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Unwind with a relaxing weekend trip at a discounted rate.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">👨‍👩‍👦</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Family Vacation</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Special offers for families traveling together.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🧗‍♂️</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Adventure Packages</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Explore thrilling experiences at great prices.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 4 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🌄</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Mountain Retreat</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Recharge with nature in our serene mountain lodges.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 5 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🌊</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Beach Escape</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Enjoy the sun and surf with exclusive beach packages.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 6 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🏰</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Cultural Tour</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Explore the rich history and culture of famous landmarks.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 7 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🎉</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Festival Packages</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Join in on local festivities and celebrations.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>

            {/* Deal Card 8 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🏞️</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Nature Getaway</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Reconnect with nature in stunning landscapes.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-110 relative overflow-hidden group">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl group-hover:text-teal-500 transition duration-300">🏞️</span>
              <h3 className="text-2xl font-semibold text-green-700 group-hover:text-teal-600 transition duration-300">Nature Getaway</h3>
              <p className="text-gray-700 group-hover:text-teal-500 transition duration-300">Reconnect with nature in stunning landscapes.</p>
              <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105">Book Now</button>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};

export default Dashboard;
