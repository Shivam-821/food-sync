import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import image from "../../assets/about2.jpeg";

function About() {
  return (
    <div className="bg-gradient-to-r from-green-200 pt-5 to-blue-100 min-h-screen font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1 
          className="text-5xl font-extrabold text-gray-800 text-center" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Our Journey & Mission
        </motion.h1>

        <motion.p 
          className="text-lg text-gray-700 mt-6 text-center leading-relaxed" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          At <span className="text-blue-600 font-semibold">FoodSync</span>, we are committed to creating a sustainable future by reducing food waste and ensuring surplus food reaches those in need. 
          Our journey began when our founder saw firsthand the immense amount of food wasted daily while so many people struggled with hunger. 
          This inspired us to create a platform that bridges the gap between food producers, retailers, and NGOs.
        </motion.p>

        <div className="mt-12 flex justify-center">
          <motion.img 
            className="rounded-lg shadow-lg w-full max-w-3xl border-4 border-gray-300 hover:scale-105 transition-transform duration-300" 
            src={image}
            alt="Our Mission"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </div>

        <motion.h2 
          className="text-4xl font-semibold text-gray-800 mt-16 text-center" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          How We Make an Impact
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🌎 Sustainability</h3>
            <p className="text-gray-700 mt-2">We help reduce environmental waste by upcycling surplus food and minimizing landfill waste.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🤝 Community Support</h3>
            <p className="text-gray-700 mt-2">By collaborating with local NGOs and charities, we ensure food reaches those in need.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📦 Smart Distribution</h3>
            <p className="text-gray-700 mt-2">Our AI-powered tracking system ensures food is distributed efficiently.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📊 Data & Analytics</h3>
            <p className="text-gray-700 mt-2">We use real-time data to optimize food redistribution and maximize impact.</p>
          </motion.div>
        </div>

        <motion.h2 
          className="text-4xl font-semibold text-gray-800 mt-16 text-center" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Join Our Movement
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-700 mt-4 text-center" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Whether you're a food producer looking to reduce waste, an NGO seeking food donations, or an individual wanting to contribute, we welcome you! Together, we can build a world with less waste and more nourishment.
        </motion.p>

        <motion.h2 
          className="text-3xl font-semibold text-gray-800 mt-16 text-center" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Ways to Get Involved
        </motion.h2>

        <ul className="mt-6 text-lg text-gray-700 space-y-4 max-w-3xl mx-auto">
          <motion.li whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
            <span className="text-3xl">🍽️</span>
            <span><strong>Donate Food:</strong> If you have surplus food, consider donating it to help those in need.</span>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
            <span className="text-3xl">👐</span>
            <span><strong>Volunteer:</strong> Join our team of volunteers to help with food distribution and community outreach.</span>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
            <span className="text-3xl">📢</span>
            <span><strong>Spread the Word:</strong> Share our mission with your friends and family to raise awareness about food waste.</span>
          </motion.li>
        </ul>

        <div className="mt-8 text-center">
          <motion.a 
            href="/contact " 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            Get Involved
          </motion.a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;