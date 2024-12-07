import React from "react";
import { Link } from "react-router-dom";
import { FaPlane, FaCheckCircle, FaSmile } from "react-icons/fa"; // Importing animated icons

function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center z-10">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
          Thank You for Using Our Services!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your booking has been successfully confirmed.
        </p>
        <p className="text-md text-gray-600 mb-8">
          A confirmation email has been sent to your inbox.
        </p>
        <Link
          to="/dashboard"
          className="text-lg font-semibold text-white bg-green-500 py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Go Back to Homepage
        </Link>
      </div>

      {/* Animated Icons */}
      <div className="absolute top-10 left-1/4 animate-plane" style={{ fontSize: "60px", color: "#fff" }}>
        <FaPlane />
      </div>
      <div className="absolute bottom-20 right-10 animate-check" style={{ fontSize: "50px", color: "#fff" }}>
        <FaCheckCircle />
      </div>
      <div className="absolute top-40 left-1/2 animate-smile" style={{ fontSize: "50px", color: "#fff" }}>
        <FaSmile />
      </div>

      <style>
        {`
          @keyframes movePlane {
            0% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(20vw) rotate(15deg); }
            100% { transform: translateX(0) rotate(0deg); }
          }

          @keyframes moveCheck {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10vw) rotate(30deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }

          @keyframes moveSmile {
            0% { transform: translateX(0) scale(1); }
            50% { transform: translateX(-10vw) scale(1.2); }
            100% { transform: translateX(0) scale(1); }
          }

          .animate-plane {
            animation: movePlane 5s ease-in-out infinite;
          }

          .animate-check {
            animation: moveCheck 5s ease-in-out infinite;
          }

          .animate-smile {
            animation: moveSmile 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default ThankYouPage;
