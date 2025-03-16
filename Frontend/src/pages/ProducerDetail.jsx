import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProducerDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://imgs.search.brave.com/infROkE3qEnyLfNcO-cEkJfbiXqq4XtSkwzdwsCY_yU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8xNy8yMC8yMS9j/YXQtNTE4MzQyN182/NDAuanBn"
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isImageHovered, setIsImageHovered] = useState(false);
  const navigate = useNavigate();

  // State to store producer data fetched from the backend
  // const [producerData, setProducerData] = useState({
  //   fullname: "John Doe",
  //   email: "john.doe@foodsync.com",
  //   location: "United States",
  //   bio: "Passionate about reducing food waste and promoting sustainability.",
  //   producerType: "Food Manufacturer",
  //   donation: "10,000 meals donated",
  //   rating: "4.5/5",
  //   history: [
  //     { item: "Burger", amount: "₹3457", date: "2022-02-20" },
  //     { item: "Vegetables", amount: "₹1200", date: "2021-12-15" },
  //     { item: "Chocolate", amount: "₹2500", date: "2021-10-10" },
  //     { item: "Pizza", amount: "₹4000", date: "2021-08-05" },
  //   ],
  //   contact: {
  //     email: "contact@foodsync.com",
  //     phone: "+1 (555) 123-4567",
  //   },
  // });

  const [producerData, setProducerData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    bio: "",
    producerType: "",
    companyName: "",
    avatar: "",
    history: [],
  });

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
          `${import.meta.env.VITE_BASE_URL}/api/v1/producer/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          const user = response.data.data;
          console.log(user);

          // Extract donated items' names
          const donatedItems = user.donationsMade
            .flatMap((donation) => donation.items.map((item) => item.name))
            .join(", "); // Join names into a comma-separated string

          setProducerData({
            fullname: user.fullname,
            email: user.email,
            donation: donatedItems || "No donations yet", // Set donated items' names
            history: user.items,
            phone: user.phone,
            companyName: user.companyName,
            location: user.location
              ? `${user.location.coordinates[1]}, ${user.location.coordinates[0]}` // Format location as a string
              : "Location not available",
            address: user.address,
            bio: user.bio || "No bio available",
            producerType: user.producerType,
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
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducerData((prevData) => ({
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
    localStorage.removeItem("accessToken"); // Clear the access token
    navigate("/");
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
      className={`min-h-screen font-sans relative mt-9 transition-colors duration-500 overflow-auto h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-yellow-50 text-gray-900"
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
          {["profile", "history", "contact"].map((tab) => (
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
                    src={profileImage}
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
                  {producerData.fullname}
                </motion.h1>
                <motion.p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {producerData.email}
                </motion.p>

                <motion.p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {producerData.companyName}
                </motion.p>
              </motion.div>

              <motion.div
                className={`flex items-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-4`}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <i className="ri-map-pin-line mr-2"></i>
                <span>{producerData.location}</span>
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
          {/* Donation, Rating, and Producer Type */}
          {activeTab === "profile" && (
            <div className="space-y-6">
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
                    <i className="ri-heart-line mr-2 text-red-500"></i>
                    Donation
                  </h2>
                  <motion.div
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-red-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium">{producerData.donation}</span>
                    <motion.div className="w-full h-1 bg-red-500/30 mt-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500"
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
                    <i className="ri-star-line mr-2 text-yellow-500"></i>
                    Rating
                  </h2>
                  <motion.div
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-yellow-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium">{producerData.rating}</span>
                    <motion.div className="w-full h-1 bg-yellow-500/30 mt-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-yellow-500"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Producer Type Section */}
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
                    Producer Type
                  </h2>
                  <motion.div
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-blue-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium">
                      {producerData.producerType}
                    </span>
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

                {/* Logout Button */}
                <motion.button
                  className={`w-full py-2 rounded-lg transition ${
                    isDarkMode
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-red-600 hover:bg-red-500 text-white"
                  } mt-4`}
                  onClick={handleLogOut}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Log Out
                </motion.button>
              </motion.div>
            </div>
          )}

          {/* History Section */}
          {activeTab === "history" && (
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
                <i className="ri-history-line mr-2 text-purple-500"></i>
                History
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {producerData.history.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-purple-50"
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <p className="text-gray-500 text-sm">{item.updatedAt}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Information */}
          {activeTab === "contact" && (
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
                <i className="ri-contacts-line mr-2 text-green-500"></i>
                Contact Information
              </h2>
              <motion.div
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-700/50" : "bg-green-50"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${producerData.email}`}
                    className="text-blue-600"
                  >
                    {producerData.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-blue-600">{producerData.phone}</span>
                </p>
              </motion.div>
            </motion.div>
          )}
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

      <Footer />
    </div>
  );
};

export default ProducerDetail;
