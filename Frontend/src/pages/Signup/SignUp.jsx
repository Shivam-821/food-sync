import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import Navbar from "../../Components/Navbar/Navbar";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Failed to connect to server.");
    }
  };

  // Social login handlers (redirect to backend OAuth routes)
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleFacebookSignup = () => {
    window.location.href = "http://localhost:5000/auth/facebook";
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 m-6">
        <div className="bg-white shadow-md rounded-lg max-w-4xl w-full flex flex-col md:flex-row">
          {/* Left Section */}
          <div className=" bg-gray-200 p-8 flex-1 flex flex-col items-center justify-center rounded-l-lg">
            <h1 className="text-2xl font-bold mb-2">
              Buy, sell, donate, connect!
            </h1>
            <p className="text-gray-600 mb-6">
              Explore a world of sustainable food options.
            </p>
            <p className="text-gray-600">
              Discover surplus food deals near you.
            </p>

            <div className="animation"></div>
          </div>

          {/* Right Section */}
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">Get started for free</h2>
            <p className="text-gray-600 mb-6">
              Unlock exclusive benefits. No commitment.
            </p>

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

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
              >
                Sign up
              </button>

              {/* "If registered, LOG IN" */}
              <p className="text-center text-gray-600 mt-4">
                If registered,{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  LOG IN
                </span>
              </p>

              {/* Social Signup Options */}
              <p className="text-center text-gray-600 my-4">or sign up with</p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 bg-red-500 text-white p-3 rounded-lg font-bold hover:bg-red-600"
                  onClick={handleGoogleSignup}
                >
                  Google
                </button>
                <button
                  type="button"
                  className="flex-1 bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-800"
                  onClick={handleFacebookSignup}
                >
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
