import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdStars } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { RiShieldFlashFill } from "react-icons/ri";
import { GiLaurelsTrophy } from "react-icons/gi";
import { GiLaurelCrown } from "react-icons/gi";

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

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    bio: "",
    consumerType: "",
    avatar: "",
    donationsMade: [],
    feedbacks: [],
    orders: [],
    gamification: "",
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
            avatar: user.avatar || profileImage,
            feedbacks: user.feedbacks || [],
            donationsMade: user.donationsMade || [],
            gamification: user.gamification || 0,
            orders: user.orders || [],
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

  //getBadge
  const getBadge = () => {
    if (userData.gamification.points < 21) {
      return <MdStars />;
    } else if (userData.gamification.points < 60) {
      return <SlBadge />;
    } else if (userData.gamification.points < 101) {
      return <RiShieldFlashFill />;
    } else if (userData.gamification.points < 151) {
      return <GiLaurelsTrophy />;
    } else {
      return <GiLaurelCrown />;
    }
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
    localStorage.removeItem("accessToken");
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
      className={`min-h-screen font-sans relative mt-16 transition-colors duration-500 overflow-auto h-screen ${
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
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`flex justify-center space-x-4 mb-8 p-2 rounded-xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          {["profile", "activity", "contacts"].map((tab) => (
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
              {/* Profile Image and Upload */}
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

              {/* User Details */}
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
                <motion.p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2 pl-7`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {userData.phone}
                </motion.p>
              </motion.div>

              {/* Location */}
              <motion.div
                className={`flex items-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-4`}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <i className="ri-map-pin-line mr-2"></i>
                <span>{userData.location}</span>
              </motion.div>

              {/* Edit Profile Button */}
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
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
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
                  <h2 className="text-2xl font-semibold mb-10 flex items-center">
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
                  <h2 className="text-2xl font-semibold mb-3 flex mt--5px">
                    <i className="ri-award-fill text-green-500"></i>
                    POINTS
                    <h1 className="text-6xl pl-40 p">{getBadge()}</h1>
                  </h2>
                  <motion.p
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-green-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h1 className="text-md font-bold">
                      {userData.gamification.points}
                    </h1>
                  </motion.p>
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
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={handleLogOut}
                  className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-500 transition-all shadow-lg cursor-pointer"
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
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
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
                Activity
              </h2>
              <div className="space-y-6">
                {/* Feedback Section */}
                {userData.feedbacks.map((feedback, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl shadow-md ${
                      isDarkMode ? "bg-gray-700/50" : "bg-purple-50"
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">My Feedback</h3>
                    <p className="text-gray-600">
                      <strong>Rating:</strong> {feedback.rating}
                    </p>
                    <p className="text-gray-600">
                      <strong>Comment:</strong> {feedback.comment}
                    </p>
                    <p className="text-gray-500 text-sm">
                      <strong>Date:</strong>{" "}
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}

                {/* Orders Section */}
                {userData.orders.map((order, index) => {
                  const itemsList = order.items
                    .map((item) => ` ${item.item.name} (${item.quantity}) `)
                    .join(", ");

                  return (
                    <motion.div
                      key={index}
                      className={`p-6 rounded-xl shadow-md ${
                        isDarkMode ? "bg-gray-700/50" : "bg-blue-50"
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Order #{index + 1}
                      </h3>
                      <p className="text-gray-600">
                        <strong>Items:</strong> [{itemsList}]
                      </p>
                      <p className="text-gray-600">
                        <strong>Total Amount:</strong> ₹{order.totalAmount}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
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
                    href={`mailto:${userData.email}`}
                    className="text-blue-600"
                  >
                    {userData.email}
                  </a>
                </p>
                <p>
                  Phone: <span className="text-blue-600">{userData.phone}</span>
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
                Will wait for you 😃
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
