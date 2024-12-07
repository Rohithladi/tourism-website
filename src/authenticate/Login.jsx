import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/bg.jpg';
import overlayImage from '../images/map.jpg';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { UserContext } from '../authenticate/Usercontext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


function Login() {
  const { setUsername } = useContext(UserContext); // Correctly use UserContext here
  const [showWelcome, setShowWelcome] = useState(false);
  const [username, setLocalUsername] = useState(''); // Local state for welcome message
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect input values
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if the email and password match the admin credentials
    if (email === 'rishitha@gmail.com' && password === 'Rishitha@2004') {
      setUsername('Admin'); 
      setLocalUsername('admin'); // Set local state for welcome message
      setShowWelcome(true);

      // Delay navigation for 1 second to show welcome message
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      try {
        const response = await fetch('http://localhost:8080/api/users/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const user = await response.json();
          setUsername(user.username); // Update global state
          setLocalUsername(user.username); // Update local state for welcome message
          setShowWelcome(true);

          // Delay navigation for 1 second
          setTimeout(() => {
            navigate('/dashboard', { state: { username: user.username } });
          }, 1000);
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-60"></div>

      {/* Moving Icons */}
      <div className="absolute inset-0 flex justify-around items-center">
        <AiOutlineMail className="text-blue-500 text-5xl animate-bounce duration-1000" />
        <AiOutlineLock className="text-red-500 text-5xl animate-bounce duration-1000 delay-150" />
      </div>

      <div
        className="relative z-10 bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-lg w-full mx-4 transform transition duration-500 hover:scale-105"
        style={{
          backgroundImage: `url(${overlayImage}), linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(230, 230, 250, 0.9))`,
          backgroundBlendMode: 'overlay, normal',
        }}
      >
        {showWelcome ? (
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome, {username}!
          </h2>
        ) : (
          <>
            <h1
              className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-wide"
              style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)" }}
            >
              Log In
            </h1>

            <p className="text-center text-gray-600 mb-8">
              Welcome back! Please enter your credentials.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter your email"
                    required
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
                    type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-lg" /> // Icon for "hide password"
                    ) : (
                      <AiOutlineEye className="text-lg" /> // Icon for "show password"
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-600 transition duration-300 transform hover:scale-105"
              >
                Log In
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600 text-sm">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
                Sign up
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
