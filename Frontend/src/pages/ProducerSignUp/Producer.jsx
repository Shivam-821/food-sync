import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./producer.css";
import { ProducerDataContext } from '../../Context/ProducerContext'
import axios from "axios";

const ProducerSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone:"",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    producerType: "",
    address:""
  });

  const [ location, setLocation ] = useState(null)
  const [ locationError, setLocationError ] = useState('')

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            type: 'Point',
            coordinates: [position.coords.longitude, position.coords.latitude]
          })
          setLocationError('')
        },
        (error) => {
          setLocationError('Unable to retrieve your location. Please enable location services.')
        }
      )
    } else {
      setLocationError('Geolocation is not supported by your browser.')
    }
  }

  const {producer , setProducer} = useContext(ProducerDataContext)

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
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
    // if (!formData.location.trim()) newErrors.location = "Location is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!location) {
      setLocationError('Please get your location before signing up')
      return
    }

    const ProducerData = {
      fullname: formData.fullName,
      email: formData.email,
      phone:formData.phone,
      password: formData.password,
      companyName: formData.companyName,
      producerType: formData.producerType,
      location
    }
 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/producer/register`, ProducerData)
      console.log(response.data)
      if (response.status === 200) {
        const data = response.data
        setProducer(data.producer)
        localStorage.setItem('token', data.token)
        alert("Registration successful!");
        navigate("/surplusProducer");
      } else {
        alert("Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 m-3 pt-15">
        <div className="bg-white shadow-md rounded-lg max-w-6xl w-full flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-gray-200 p-8 flex-1 flex flex-col items-center justify-center rounded-l-lg">
            <h1 className="text-2xl font-bold mb-2">Join as a Food Producer</h1>
            <p className="text-gray-600 mb-6">
              Sell or donate your surplus food efficiently.
            </p>
            <p className="text-gray-600">
              Connect with consumers and reduce food waste.
            </p>
            <div className="animation mt-5"></div>
          </div>

          {/* Right Section */}
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
            <p className="text-gray-600 mb-6">Join our network today.</p>

            {/* Signup Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName}</p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              
              {/* UTKARSH SINGH - ADDED THIS LINE */}
              <input
                type="tel"  // 'tel' type ensures only numbers are entered
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[6-9]\d{9}"  // Ensures only 10-digit Indian numbers
                title="Mobile Number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Company Name */}
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.companyName && (
                <p className="text-red-500">{errors.companyName}</p>
              )}

              {/* Producer Type Dropdown */}
              <select
                name="producerType"
                value={formData.producerType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" >Select Producer Type</option>
                <option value="factory">Factory</option>
                <option value="supermarket">Supermarket</option>
                <option value="hotel">Hotel</option>
                <option value="restaurant">Restaurant</option>
                <option value="farmer">Farmer</option>
              </select>
              {errors.producerType && (
                <p className="text-red-500">{errors.producerType}</p>
              )}

              {/* Location Input */}
              <input
                type="text"
                name="address"
                placeholder="Location"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location}</p>
              )}

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
                {/* UTKARSH BABU ADDED LOCATION */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={getLocation}
                  className="bg-blue-500 text-white font-semibold mb-2 rounded-lg px-4 py-2 w-full text-lg"
                >
                  Get My Location
                </button>
                {locationError && (
                  <p className="text-red-500 text-sm mb-2">{locationError}</p>
                )}
                {location && (
                  <p className="text-sm text-gray-600">
                    Location captured: {location.coordinates[1].toFixed(4)}, {location.coordinates[0].toFixed(4)}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
              >
                Sign Up
              </button>

              <p className="text-center text-gray-600 mt-4">
                Already registered?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProducerSignUp;
