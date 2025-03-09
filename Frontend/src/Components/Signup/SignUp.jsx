import React from "react";
import { FaUtensils, FaKey } from "react-icons/fa";
import "./signup.css";

const SignUp = () => {
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white shadow-md rounded-lg max-w-4xl w-full flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-gray-200 p-8 flex-1 flex flex-col items-center justify-center rounded-l-lg">
            <h1 className="text-2xl font-bold mb-2">
              Buy, sell, donate, connect!
            </h1>
            <p className="text-gray-600 mb-6">
              Explore a world of sustainable food options.
            </p>
            <div className="animation"></div>
            <p className="text-gray-600">
              Discover surplus food deals near you.
            </p>
          </div>

          {/* Right Section */}
          <div className="p-8 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">FoodSaver</h1>
              <p className="text-gray-600">Join the food waste revolution.</p>
            </div>
            <h2 className="text-2xl font-bold mb-2">Get started for free</h2>
            <p className="text-gray-600 mb-6">
              Unlock exclusive benefits. No commitment.
            </p>

            {/* Signup Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your full name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaUtensils className="absolute right-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaKey className="absolute right-3 top-3 text-gray-400" />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-200 p-3 rounded-lg font-bold text-gray-700 hover:bg-gray-300"
              >
                Sign up
              </button>
            </form>

            <p className="text-center text-gray-600 my-4">or sign up with</p>
            <div className="flex space-x-4">
              <button className="flex-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-700 hover:bg-gray-300">
                Google
              </button>
              <button className="flex-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-700 hover:bg-gray-300">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
