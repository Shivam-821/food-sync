"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    {
      quote: "Your efforts in reducing food waste are truly inspiring!",
      quote1:
        "Every step you take makes a big difference for people and the planet. Keep up the amazing work!",
    },
    {
      quote: "What you're doing isn't just about saving food—",
      quote1:
        "it's about saving resources, supporting communities, and protecting our environment. Thank you for making a real impact!",
    },
    {
      quote: "Keep serving.",
      quote1: "keep Exploring",
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
        {
          emailOrPhone,
          password,
        }
      );

      const { accessToken, refreshToken, user } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success("Login successful! Redirecting...");

      if (user.role === "consumer") {
        navigate("/", { state: { user } });
      } else if (user.role === "producer") {
        navigate("/SurplusProducer", { state: { user } });
      } else if (user.role === "upcycling-industry") {
        navigate("/upcycling-profile", { state: { user } });
      } else {
        toast.error("Invalid role received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 to-pink-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl h-[650px] flex rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg shadow-2xl"
      >
        {/* Left Section - Login Form */}
        <div className="flex-1 p-10 bg-blue-300 rounded-r-3xl">
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-10 h-10"
            >
              {/* Your logo here */}
              <div className="w-30 h-10 bg-gradient-to-r from-purple-400 to-pink-300 rounded-lg p-1.6 pt-1 pl-2 text-2xl">
                FoodSync
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <h1 className="text-4xl font-semibold mb-2">Welcome back</h1>
            <p className="text-gray-600 mb-8">
              Please Enter your Account details
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="foodSync@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-600">
                    Keep me logged in
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Forgot Password
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </motion.button>

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                {[FaGoogle, FaFacebook].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-purple-500 hover:text-purple-500 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right Section - Testimonials */}
        <div className="flex-1 p-10 bg-gradient-to-br from-purple-900 to-purple-700 text-white relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-semibold leading-tight"
            >
              Nourish the Future! 🌱🍽️♻️
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="my-10"
              >
                <p className="text-lg mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <h4 className="font-medium text-lg">
                  {testimonials[currentTestimonial].quote1}
                </h4>
              </motion.div>
            </AnimatePresence>

            <div className="flex space-x-3">
              {[HiChevronLeft, HiChevronRight].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (i === 0) {
                      setCurrentTestimonial((prev) =>
                        prev === 0 ? testimonials.length - 1 : prev - 1
                      );
                    } else {
                      setCurrentTestimonial((prev) =>
                        prev === testimonials.length - 1 ? 0 : prev + 1
                      );
                    }
                  }}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
        </div>
      </motion.div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
