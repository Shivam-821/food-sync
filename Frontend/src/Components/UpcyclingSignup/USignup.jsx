import React, { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaRecycle,
  FaSignInAlt,
  FaArrowRight,
} from "react-icons/fa";
import { UpcyclingIDataContext } from "../../Context/UpcyclingIContext";
import "./upcycle.css";

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
    <div className="signup-page overflow-auto h-screen">
      {/* Custom cursor */}
      <motion.div
        className="cursor"
        animate={{
          x: cursorX,
          y: cursorY,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      <div className="signup-container">
        {/* Left Section - Information */}
        <motion.div
          className="info-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="info-content">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Join the Upcycling Revolution
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform food waste into valuable resources through innovative
              upcycling methods.
            </motion.p>

            <motion.div
              className="benefits"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="benefit-item">
                <FaRecycle className="benefit-icon" />
                <h3>Reduce Waste</h3>
                <p>Convert food waste into valuable products</p>
              </div>

              <div className="benefit-item">
                <FaRecycle className="benefit-icon" />
                <h3>Create Value</h3>
                <p>Generate new revenue streams</p>
              </div>

              <div className="benefit-item">
                <FaRecycle className="benefit-icon" />
                <h3>Sustainable Future</h3>
                <p>Contribute to a circular economy</p>
              </div>
            </motion.div>

            {/* <div className="upcycle-3d">
              <div className="cube">
                <div className="face front"></div>
                <div className="face back"></div>
                <div className="face right"></div>
                <div className="face left"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
              </div>
            </div> */}
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-form">
            <h2>Create Your Account</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-field">
                  <FaUser className="field-icon" />
                  <input
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <FaEnvelope className="field-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <FaPhone className="field-icon" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <FaLock className="field-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <FaLock className="field-icon" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <FaRecycle className="field-icon" />
                  <select
                    name="upcyclingMethods"
                    value={formData.upcyclingMethods}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Upcycling Method
                    </option>
                    <option value="compost">Compost</option>
                    <option value="biogas">Bio gas</option>
                    <option value="cosmetics">Cosmetics</option>
                   <option value="fertilizer">Energy</option>
                  </select>
                </div>
              </div>

              <div className="location-section">
                <button
                  type="button"
                  onClick={getLocation}
                  disabled={isLoading}
                  className="location-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Getting Location...</span>
                    </>
                  ) : (
                    <>
                      <FaMapMarkerAlt />
                      <span>Get My Location</span>
                    </>
                  )}
                </button>

                {locationError && (
                  <p className="error-message">{locationError}</p>
                )}

                {location && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="location-success"
                  >
                    <FaMapMarkerAlt />
                    <span>
                      Location captured: {location.coordinates[1].toFixed(4)},{" "}
                      {location.coordinates[0].toFixed(4)}
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="form-actions">
                <motion.button
                  type="submit"
                  className="signup-button"
                  disabled={!isFormValid || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <FaArrowRight />
                    </>
                  )}
                </motion.button>

                <div className="login-link">
                  <p>Already registered?</p>
                  <motion.button
                    type="button"
                    className="login-button"
                    onClick={() => navigate("/login")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default USignup;
