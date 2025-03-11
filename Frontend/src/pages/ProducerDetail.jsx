import React from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { motion } from "framer-motion";

const ProducerDetail = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 min-h-screen font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Profile Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            className="h-40 w-40 rounded-full border-4 border-gray-300 shadow-md hover:scale-105 transition-transform"
            src="https://imgs.search.brave.com/infROkE3qEnyLfNcO-cEkJfbiXqq4XtSkwzdwsCY_yU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8xNy8yMC8yMS9j/YXQtNTE4MzQyN182/NDAuanBn"
            alt="Producer"
          />
          <div>
            <h1 className="text-4xl font-bold">John Doe</h1>
            <h2 className="text-xl text-gray-700">@FoodSync Private Limited</h2>
            <div className="flex items-center text-gray-800 mt-2">
              <i className="ri-map-pin-line text-xl mr-2"></i>
              <span>United States</span>
            </div>
            <p className="text-gray-600 mt-2">Passionate about reducing food waste and promoting sustainability.</p>
          </div>
        </motion.div>

        {/* Information Sections */}
        <div className="mt-10 space-y-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-2">Donation</h2>
            <p className="text-gray-700">We have donated over 10,000 meals to local charities and food banks in the past year.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-2">Rating</h2>
            <img className="w-40 mt-3" src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Star_rating_4.5_of_5.png" alt="Rating" />
            <p className="text-gray-600 mt-2">Rated 4.5/5 based on 200 reviews from our partners.</p>
          </motion.div>
        </div>

        {/* History Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold">History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {["Burger", "Vegetables", "Chocolate", "Pizza"].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <img className="h-16 w-16 mr-4" src="https://www.pngall.com/wp-content/uploads/2016/03/Food-PNG.png" alt="Food" />
                <div>
                  <h3 className="font-semibold">{item}</h3>
                  <p className="text-gray -600">₹3457 - 2022-02-20</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Information Section */}
        <motion.div 
          className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">For inquiries, please reach out via email: <a href="mailto:contact@foodsync.com" className="text-blue-600">contact@foodsync.com</a></p>
          <p className="text-gray-700">Phone: <span className="text-blue-600">+1 (555) 123-4567</span></p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProducerDetail;