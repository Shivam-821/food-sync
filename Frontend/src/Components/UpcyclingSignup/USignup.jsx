import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useRef } from "react";
import axios from "axios";
import "./upcycle.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaRecycle,
} from "react-icons/fa";
import { UpcyclingIDataContext } from "../../Context/UpcyclingIContext";

const USignup = () => {
  const navigate = useNavigate();
  const { upcyclingI, setUpcyclingI } = useContext(UpcyclingIDataContext);
  const formRef = useRef(null);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [location, setLocation] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude],
          });
          setLocationError("");
          setIsLoading(false);
        },
        (error) => {
          setLocationError(
            "Unable to retrieve your location. Please enable location services."
          );
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    upcyclingMethods: "",
  });

  useEffect(() => {
    const checkFormValidity = () => {
      const isValid =
        formData.companyName.trim() !== "" &&
        formData.email.includes("@") &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword &&
        formData.upcyclingMethods.trim() !== "" &&
        formData.phone.trim() !== "" &&
        /^[6-9]\d{9}$/.test(formData.phone) &&
        location !== null;

      setIsFormValid(isValid);
    };

    checkFormValidity();
  }, [formData, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setLocationError("Please get your location before signing up");
      return;
    }

    setIsLoading(true);
    const UpcyclingInustryData = {
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      upcyclingMethods: formData.upcyclingMethods,
      location,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/upcyclingIndustry/register`,
        UpcyclingInustryData
      );
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data;
        setUpcyclingI(data.upcyclingI);
        console.log(data);
        const userId = response.data.data.user._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
        const token = response.data.data.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
        }
        setIsLoading(false);

        // Success animation before redirect
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setIsLoading(false);
        alert("Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setIsLoading(false);
      alert("Failed to connect to server.");
    }
  };

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
            <input
              type="text"
              placeholder="Company Name"
              onChange={handleChange}
              name="companyName"
              value={formData.companyName}
              required
            />
          </div>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Your email address"
              value={formData.email}
              required
            />
          </div>
          <div className="input-box">
            <FaPhone className="icon" />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              required
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          <div className="input-box">
            <FaMapMarkerAlt className="icon" />
            <input
              type="text"
              placeholder="Location"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <FaRecycle className="icon" />
            <input
              type="text"
              placeholder="Upcycling Methods"
              name="upcyclingMethods"
              onChange={handleChange}
              value={formData.upcyclingMethods}
              required
            />
          </div>
          <motion.div variants={itemVariants} className="mb-4">
            <button
              name="location"
              type="button"
              onClick={getLocation}
              disabled={isLoading}
              className="glass-button location-button"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Getting Location...
                  </>
                ) : (
                  <>
                    <FaMapMarkerAlt className="mr-2" /> Get My Location
                  </>
                )}
              </span>
            </button>
            {locationError && (
              <p className="text-red-300 text-sm mb-2">{locationError}</p>
            )}
            {location && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-blue-100 bg-blue-900/30 p-2 rounded-lg border border-blue-500/30 backdrop-blur-sm mt-2"
              >
                <p className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-300 mr-2" />
                  Location captured: {location.coordinates[1].toFixed(4)},{" "}
                  {location.coordinates[0].toFixed(4)}
                </p>
              </motion.div>
            )}
          </motion.div>
          <motion.button
            onClick={handleSubmit}
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
