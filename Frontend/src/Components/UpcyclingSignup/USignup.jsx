import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./upcycle.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaRecycle,
} from "react-icons/fa";

const USignup = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="signup-container">
      {/* Cursor Animation */}
      <motion.div
        className="cursor-effect"
        animate={{ x: cursorX - 75, y: cursorY - 75 }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      {/* Glassmorphic Signup Form */}
      <div className="signup-box">
        <h2>Upcycling Industry Signup</h2>
        <form>
          <div className="input-box">
            <FaUser className="icon" />
            <input type="text" placeholder="Company Name" required />
          </div>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-box">
            <FaPhone className="icon" />
            <input type="text" placeholder="Phone Number" required />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-box">
            <FaMapMarkerAlt className="icon" />
            <input type="text" placeholder="Location" required />
          </div>
          <div className="input-box">
            <FaRecycle className="icon" />
            <input type="text" placeholder="Upcycling Methods" required />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="signup-btn"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default USignup;
