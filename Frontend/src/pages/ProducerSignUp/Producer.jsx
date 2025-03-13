"use client";

import { useContext, useState, useEffect, useRef } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./producer.css";
import { ProducerDataContext } from "../../Context/ProducerContext";
import axios from "axios";
import { motion } from "framer-motion";

const ProducerSignUp = () => {
  const navigate = useNavigate();
  const { producer, setProducer } = useContext(ProducerDataContext);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    producerType: "",
    address: "",
  });

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFormValid, setIsFormValid] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isButtonMoving, setIsButtonMoving] = useState(false);

  // Track mouse position for glassmorphism effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Check form validity
  useEffect(() => {
    const checkFormValidity = () => {
      const isValid =
        formData.fullName.trim() !== "" &&
        formData.email.includes("@") &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword &&
        formData.companyName.trim() !== "" &&
        formData.producerType !== "" &&
        formData.phone.trim() !== "" &&
        /^[6-9]\d{9}$/.test(formData.phone) &&
        location !== null;

      setIsFormValid(isValid);
    };

    checkFormValidity();
  }, [formData, location]);

  // Handle button movement when form is invalid
  const handleButtonMouseEnter = () => {
    if (!isFormValid && !isLoading) {
      moveButton();
    }
  };

  const moveButton = () => {
    if (!buttonRef.current || !formRef.current) return;

    setIsButtonMoving(true);

    const formRect = formRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    // Calculate safe area to move within the form
    const maxX = formRect.width - buttonRect.width;
    const maxY = formRect.height - buttonRect.height;

    // Generate random position within the form boundaries
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setButtonPosition({ x: randomX, y: randomY });

    // Reset the moving state after animation completes
    setTimeout(() => {
      setIsButtonMoving(false);
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required.";
    if (!formData.producerType)
      newErrors.producerType = "Select a producer type.";
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!location) {
      setLocationError("Please get your location before signing up");
      return;
    }

    setIsLoading(true);

    const ProducerData = {
      fullname: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      companyName: formData.companyName,
      producerType: formData.producerType,
      location,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/producer/register`,
        ProducerData
      );
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data;
        setProducer(data.producer);
        console.log(data);
        const token = response.data.data.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
        }
        setIsLoading(false);

        // Success animation before redirect
        setTimeout(() => {
          navigate("/surplusProducer");
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

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    let text = "";
    if (strength === 1) text = "Weak";
    else if (strength === 2) text = "Fair";
    else if (strength === 3) text = "Good";
    else if (strength === 4) text = "Strong";

    return { strength, text };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <>
      <Navbar />
      <div
        className="glassmorphism-container overflow-hidden"
        ref={containerRef}
      >
        {/* Floating orbs that follow mouse */}
        <div
          className="orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${
              mousePosition.y * 0.05
            }px)`,
          }}
        ></div>
        <div
          className="orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.08}px, ${
              mousePosition.y * -0.08
            }px)`,
          }}
        ></div>
        <div
          className="orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${
              mousePosition.y * 0.03
            }px)`,
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          {/* Left Section */}
          <div className="glass-panel left-panel">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-white">
                Join as a Food Producer
              </h1>
              <div className="h-1 w-20 bg-yellow-400 mb-6 rounded-full mx-auto"></div>
              <p className="text-blue-100 mb-6 text-center text-lg">
                Sell or donate your surplus food efficiently and make a positive
                impact.
              </p>
              <p className="text-blue-100 text-center mb-8">
                Connect with consumers and reduce food waste while growing your
                business.
              </p>

              {/* Animated illustration */}
              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="floating-icon"
                  style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${
                      mousePosition.y * 0.02
                    }px)`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">🌱</div>
                    <div className="text-xl font-bold text-white">
                      Reduce Waste
                    </div>
                    <div className="text-sm mt-2 text-blue-100">
                      Save Food, Save Planet
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="glass-panel right-panel">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              ref={formRef}
              className="form-container"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-2 text-white">Sign Up</h2>
                <div className="h-1 w-12 bg-blue-500 mb-6 rounded-full"></div>
                <p className="text-blue-100 mb-6">
                  Join our network today and make a difference.
                </p>
              </motion.div>

              {/* Signup Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setActiveField("fullName")}
                    onBlur={() => setActiveField(null)}
                    className={`glass-input ${
                      activeField === "fullName"
                        ? "active-input"
                        : errors.fullName
                        ? "error-input"
                        : formData.fullName
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className={`glass-input ${
                      activeField === "email"
                        ? "active-input"
                        : errors.email
                        ? "error-input"
                        : formData.email && formData.email.includes("@")
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaPhone />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    pattern="[6-9]\d{9}"
                    title="Please enter a valid 10-digit mobile number"
                    className={`glass-input ${
                      activeField === "phone"
                        ? "active-input"
                        : errors.phone
                        ? "error-input"
                        : formData.phone && /^[6-9]\d{9}$/.test(formData.phone)
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaBuilding />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    onFocus={() => setActiveField("companyName")}
                    onBlur={() => setActiveField(null)}
                    className={`glass-input ${
                      activeField === "companyName"
                        ? "active-input"
                        : errors.companyName
                        ? "error-input"
                        : formData.companyName
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute left-3 top-3.5 text-blue-300">
                      <FaBuilding />
                    </div>
                    <select
                      name="producerType"
                      value={formData.producerType}
                      onChange={handleChange}
                      onFocus={() => setActiveField("producerType")}
                      onBlur={() => setActiveField(null)}
                      className={`glass-input appearance-none ${
                        activeField === "producerType"
                          ? "active-input"
                          : errors.producerType
                          ? "error-input"
                          : formData.producerType
                          ? "success-input"
                          : ""
                      }`}
                    >
                      <option value="">Select Producer Type</option>
                      <option value="factory">Factory</option>
                      <option value="supermarket">Supermarket</option>
                      <option value="hotel">Hotel</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="farmer">Farmer</option>
                    </select>
                    <div className="absolute right-3 top-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {errors.producerType && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.producerType}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setActiveField("address")}
                    onBlur={() => setActiveField(null)}
                    className={`glass-input ${
                      activeField === "address" ? "active-input" : ""
                    }`}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setActiveField("password")}
                    onBlur={() => setActiveField(null)}
                    className={`glass-input ${
                      activeField === "password"
                        ? "active-input"
                        : errors.password
                        ? "error-input"
                        : formData.password && formData.password.length >= 6
                        ? "success-input"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-blue-300 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}

                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full ${
                              i < passwordStrength.strength
                                ? passwordStrength.strength === 1
                                  ? "bg-red-500"
                                  : passwordStrength.strength === 2
                                  ? "bg-orange-500"
                                  : passwordStrength.strength === 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-700"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p
                        className={`text-xs ${
                          passwordStrength.strength === 1
                            ? "text-red-300"
                            : passwordStrength.strength === 2
                            ? "text-orange-300"
                            : passwordStrength.strength === 3
                            ? "text-yellow-300"
                            : "text-green-300"
                        }`}
                      >
                        {passwordStrength.text}
                      </p>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-blue-300">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setActiveField("confirmPassword")}
                    onBlur={() => setActiveField(null)}
                    className={`glass-input ${
                      activeField === "confirmPassword"
                        ? "active-input"
                        : errors.confirmPassword
                        ? "error-input"
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "success-input"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-blue-300 hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <button
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
                        Location captured: {location.coordinates[1].toFixed(
                          4
                        )}, {location.coordinates[0].toFixed(4)}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  style={{
                    position: "relative",
                    transform: isFormValid
                      ? "none"
                      : `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                    transition: isButtonMoving
                      ? "transform 0.5s ease-out"
                      : "none",
                  }}
                  ref={buttonRef}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="glass-button signup-button"
                    onMouseEnter={handleButtonMouseEnter}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
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
                        Processing...
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-center text-blue-100 mt-4"
                >
                  Already registered?{" "}
                  <span
                    className="text-blue-300 cursor-pointer hover:text-white font-medium transition-colors duration-300"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </span>
                </motion.p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProducerSignUp;
