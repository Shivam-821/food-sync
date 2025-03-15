"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Send login request to the common login endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
        { emailOrPhone, password }
      );

      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const userId = response.data.data.user._id;
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      // Redirect based on role
      if (user.role === "consumer") {
        navigate("/", { state: { user } });
      } else if (user.role === "producer") {
        navigate("/producerHome", { state: { user } });
      } else if (user.role === "upcycling-industry") {
        navigate("/upcycling-profile", { state: { user } });
      } else {
        setError("Invalid role received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(to bottom right, #4f46e5, #7e22ce, #ec4899)",
        "linear-gradient(to bottom right, #6366f1, #8b5cf6, #f472b6)",
        "linear-gradient(to bottom right, #4f46e5, #7e22ce, #ec4899)",
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
    >
      {/* Animated particles */}
      <Particles />

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <Navbar />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 relative overflow-hidden"
        >
          {/* Glassmorphism light effect */}
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-white/30 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.h2
            variants={itemVariants}
            className="text-white text-3xl font-bold text-center mb-8 relative"
          >
            Welcome To FoodSync
          </motion.h2>

          <form onSubmit={handleLogin}>
            {/* Email/Phone Input */}
            <motion.div variants={itemVariants} className="mb-6 relative">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email or Phone
              </label>
              <motion.div
                animate={
                  focusedInput === "emailOrPhone"
                    ? { scale: 1.02 }
                    : { scale: 1 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  onFocus={() => setFocusedInput("emailOrPhone")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your email or phone"
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
                />
              </motion.div>
              <motion.div
                className="h-0.5 bg-white/50 mt-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    focusedInput === "emailOrPhone"
                      ? "100%"
                      : emailOrPhone
                      ? "100%"
                      : "0%",
                  backgroundColor:
                    focusedInput === "emailOrPhone"
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants} className="mb-6 relative">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <motion.div
                animate={
                  focusedInput === "password" ? { scale: 1.02 } : { scale: 1 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200 pr-10"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? (
                    <i className="ri-eye-off-line text-lg"></i>
                  ) : (
                    <i className="ri-eye-line text-lg"></i>
                  )}
                </motion.button>
              </motion.div>
              <motion.div
                className="h-0.5 bg-white/50 mt-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    focusedInput === "password"
                      ? "100%"
                      : password
                      ? "100%"
                      : "0%",
                  backgroundColor:
                    focusedInput === "password"
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={itemVariants} className="text-right mb-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, x: 3 }}
                className="text-white/70 hover:text-white text-sm transition duration-200 inline-block"
              >
                Forgot Password?
              </motion.a>
            </motion.div>

            {/* Login Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full p-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 relative overflow-hidden group"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <i className="ri-loader-4-line animate-spin text-lg"></i>
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-green-500/20"
                    >
                      <i className="ri-check-line text-lg"></i>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <span
                  className={
                    isLoading || isSuccess ? "opacity-0" : "opacity-100"
                  }
                >
                  Log In
                </span>

                {/* Button shine effect */}
                <motion.div
                  className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20"
                  animate={{ left: ["150%", "-150%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2.5,
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Optional: Sign Up Link */}
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Don't have an account?{" "}
                <motion.a
                  href="signup"
                  className="text-white hover:underline inline-block"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Sign Up
                </motion.a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated background particles
const Particles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const size = Math.random() * 60 + 10;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/10 backdrop-blur-md"
            style={{ width: size, height: size }}
            initial={{
              x: `${initialX}vw`,
              y: `${initialY}vh`,
              opacity: 0,
            }}
            animate={{
              y: [
                `${initialY}vh`,
                `${(initialY + 20) % 100}vh`,
                `${initialY}vh`,
              ],
              x: [
                `${initialX}vw`,
                `${(initialX + 10) % 100}vw`,
                `${initialX}vw`,
              ],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default Login;
