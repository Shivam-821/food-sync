"use client";

import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isImageHovered, setIsImageHovered] = useState(false);
  const navigate = useNavigate();

  // State to store user data fetched from the backend
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    bio: "",
    consumerType: "",
    avatar: "",
  });

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("You must be logged in to view your profile.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/consumer/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          const user = response.data.data;
          setUserData({
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            location: user.location,
            address: user.address,
            bio: user.bio || "No bio available",
            consumerType: user.consumerType,
            avatar: user.avatar || profileImage, // Use default image if avatar is not available
          });
          setProfileImage(user.avatar || profileImage); // Update profile image
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setUserData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle logout
  const handleLogOut = () => {
    setShowLogoutModal(true);
  };

  // Confirm logout
  const confirmLogOut = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("accessToken"); // Clear the access token
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div
      className={`min-h-screen font-sans relative mt-9 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
      }`}
    >
      {/* Theme Toggle Button */}
      <motion.button
        className={`fixed top-2 right-4 z-50 p-3 rounded-full shadow-lg ${
          isDarkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"
        }`}
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1, rotate: isDarkMode ? 180 : 0 }}
        whileTap={{ scale: 0.5 }}
        animate={{ rotate: isDarkMode ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <i
          className={`${isDarkMode ? "ri-sun-line" : "ri-moon-line"} text-lg`}
        ></i>
      </motion.button>

      <Navbar />

      {/* Tab Navigation */}
      <motion.div
        className="max-w-7xl mx-auto pt-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`flex justify-center space-x-4 mb-8 p-2 rounded-xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          {["profile", "activity", "settings"].map((tab) => (
            <motion.button
              key={tab}
              className={`px-6 py-2 rounded-lg capitalize font-medium transition-colors ${
                activeTab === tab
                  ? isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                  : isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto py-6 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={`rounded-2xl shadow-xl p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } transition-colors duration-300`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsImageHovered(true)}
                onHoverEnd={() => setIsImageHovered(false)}
              >
                <motion.div className="h-48 w-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg relative">
                  <motion.img
                    className="h-full w-full object-cover"
                    src={userData.avatar}
                    alt="Profile"
                    animate={{
                      scale: isImageHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i className="ri-camera-line text-white text-2xl"></i>
                  </motion.div>
                </motion.div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-500 transition shadow-lg"
                >
                  <i className="ri-camera-line"></i>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1
                  className="text-3xl font-bold mb-1"
                  whileHover={{ scale: 1.05, color: "#3b82f6" }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {userData.fullname}
                </motion.h1>
                <motion.p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {userData.email}
                </motion.p>
              </motion.div>

              <motion.div
                className={`flex items-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-4`}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <i className="ri-map-pin-line mr-2"></i>
                <span>{userData.location}</span>
              </motion.div>

              <motion.div
                className="relative w-full mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.p
                  className={`text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-6 px-4 relative z-10`}
                >
                  {userData.bio}
                </motion.p>
                <motion.div
                  className="absolute -inset-4 bg-blue-500/5 rounded-xl -z-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </motion.div>

              <motion.button
                className={`w-full py-2 rounded-lg transition ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
                onClick={handleEditToggle}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Consumer Type & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className={`p-6 rounded-xl shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } transition-colors duration-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div animate={floatingAnimation}>
                <h2 className="text-2xl font-semibold mb-3 flex items-center">
                  <i className="ri-building-line mr-2 text-blue-500"></i>
                  Consumer Type
                </h2>
                <motion.div
                  className={`text-lg ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-blue-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-medium">{userData.consumerType}</span>
                  <motion.div className="w-full h-1 bg-blue-500/30 mt-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className={`p-6 rounded-xl shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } transition-colors duration-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div animate={floatingAnimation}>
                <h2 className="text-2xl font-semibold mb-3 flex items-center">
                  <i className="ri-map-pin-line mr-2 text-green-500"></i>
                  Address
                </h2>
                <motion.p
                  className={`text-lg ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-green-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {userData.address}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className={`p-6 rounded-xl shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } transition-colors duration-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-links-line mr-2 text-purple-500"></i>
              Connect With Me
            </h2>
            <div className="flex gap-5 justify-center">
              <motion.a
                href={`https://twitter.com/${userData.twitter}`}
                className="text-blue-400 hover:text-blue-500 p-3 rounded-full"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(29, 161, 242, 0.1)",
                  rotate: [0, -10, 10, -10, 0],
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-twitter-x-line text-3xl"></i>
              </motion.a>
              <motion.a
                href={`https://instagram.com/${userData.instagram}`}
                className="text-pink-500 hover:text-pink-600 p-3 rounded-full"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(225, 48, 108, 0.1)",
                  rotate: [0, -10, 10, -10, 0],
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-instagram-line text-3xl"></i>
              </motion.a>
              <motion.a
                href={`https://linkedin.com/in/${userData.linkedin}`}
                className="text-blue-600 hover:text-blue-700 p-3 rounded-full"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(0, 119, 181, 0.1)",
                  rotate: [0, -10, 10, -10, 0],
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-linkedin-box-fill text-3xl"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* Activity Stats */}
          <motion.div
            className={`p-6 rounded-xl shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } transition-colors duration-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-bar-chart-box-line mr-2 text-indigo-500"></i>
              My Activity
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <motion.div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.p
                  className="text-3xl font-bold text-blue-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                  >
                    42
                  </motion.span>
                </motion.p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Posts
                </p>
              </motion.div>
              <motion.div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-green-900/30" : "bg-green-50"
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.p
                  className="text-3xl font-bold text-green-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                  >
                    15
                  </motion.span>
                </motion.p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Donations
                </p>
              </motion.div>
              <motion.div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-purple-900/30" : "bg-purple-50"
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p
                  className="text-3xl font-bold text-purple-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                  >
                    27
                  </motion.span>
                </motion.p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Contributions
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Edit Form */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                className={`p-6 rounded-xl shadow-md ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <i className="ri-edit-line mr-2 text-yellow-500"></i>
                  Edit Profile
                </h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      className="mb-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        className={`block ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Name
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : ""
                        }`}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </motion.div>
                    <motion.div
                      className="mb-4"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        className={`block ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Email
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : ""
                        }`}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </motion.div>
                    <motion.div
                      className="mb-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        className={`block ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Phone
                      </label>
                      <motion.input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : ""
                        }`}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </motion.div>
                    <motion.div
                      className="mb-4"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        className={`block ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Address
                      </label>
                      <motion.input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : ""
                        }`}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      className={`block ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Bio
                    </label>
                    <motion.textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleChange}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : ""
                      }`}
                      rows="4"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                  <motion.button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                    onClick={handleEditToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <i className="ri-save-line mr-2"></i>
                    Save Changes
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logout Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleLogOut}
              className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-500 transition-all shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Log Out <i className="ri-logout-box-r-line ml-2"></i>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`p-8 rounded-xl shadow-xl text-center ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <i className="ri-emotion-sad-line text-5xl text-yellow-500 mb-4"></i>
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center gap-4">
                <motion.button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
                  onClick={confirmLogOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes, Log Out
                </motion.button>
                <motion.button
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                  onClick={() => setShowLogoutModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Animation */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-white text-4xl font-bold text-center"
              initial={{ scale: 0, y: 50 }}
              animate={{
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              exit={{ scale: 0, y: -50 }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                Why did you leave us alone? 😢
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default UserProfile;
