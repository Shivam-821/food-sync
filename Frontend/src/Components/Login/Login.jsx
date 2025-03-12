import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <h2 className="text-white text-3xl font-bold text-center mb-8">
          Welcome To FoodSync
        </h2>

        {/* Email/Phone Input */}
        <div className="mb-6">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Email or Phone
          </label>
          <input
            type="text"
            placeholder="Enter your email or phone"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <a
            href="#"
            className="text-white/70 hover:text-white text-sm transition duration-200"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Log In
        </motion.button>

        {/* Optional: Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Don't have an account?{" "}
            <a href="signup" className="text-white hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
