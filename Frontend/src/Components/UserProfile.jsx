import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Components/Navbar/Navbar"; // Ensure this path is correct
import Footer from "../Components/Footer/Footer"; // Ensure this path is correct
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "Jane Doe",
    username: "@FoodSync Member",
    location: "New York, USA",
    email: "jane.doe@email.com",
    phone: "+1 (555) 987-6543",
    address: "123 Greenway Street, New York, NY",
    bio: "Passionate about reducing food waste and supporting sustainability.",
    twitter: "@janedoe",
    instagram: "@jane_doe",
    linkedin: "janedoe",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

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

  const handleLogOut = () => {
    setShowLogoutModal(true);
  };

  const confirmLogOut = () => {
    setIsLoggingOut(true);
    setShowLogoutModal(false);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen font-sans relative mt-9 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
      }`}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className={`rounded-2xl shadow-xl p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  className="h-48 w-48 rounded-full border-4 border-gray-200 shadow-lg"
                  src={profileImage}
                  alt="Profile"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-500 transition"
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
              </div>

              <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
              <p className="text-gray-500 mb-2">{userData.username}</p>

              <div className="flex items-center text-gray-500 mb-4">
                <i className="ri-map-pin-line mr-2"></i>
                <span>{userData.location}</span>
              </div>

              <p className="text-center text-gray-500 mb-6 px-4">
                {userData.bio}
              </p>

              <button
                className={`w-full py-2 rounded-lg transition ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
                onClick={handleEditToggle}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Consumer Type & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className={`p-6 rounded-xl shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-3">Consumer Type</h2>
              <p className="text-gray-500">NGO</p>
            </motion.div>

            <motion.div
              className={`p-6 rounded-xl shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-3">Address</h2>
              <p className="text-gray-500">{userData.address}</p>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            className={`p-6 rounded-xl shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
            <div className="flex gap-5 justify-center">
              <a
                href={`https://twitter.com/${userData.twitter}`}
                className="text-blue-400 hover:text-blue-500"
              >
                <i className="ri-twitter-x-line text-3xl"></i>
              </a>
              <a
                href={`https://instagram.com/${userData.instagram}`}
                className="text-pink-500 hover:text-pink-600"
              >
                <i className="ri-instagram-line text-3xl"></i>
              </a>
              <a
                href={`https://linkedin.com/in/${userData.linkedin}`}
                className="text-blue-600 hover:text-blue-700"
              >
                <i className="ri-linkedin-box-fill text-3xl"></i>
              </a>
            </div>
          </motion.div>

          {/* Activity Stats */}
          <motion.div
            className={`p-6 rounded-xl shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">My Activity</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-blue-50">
                <p className="text-3xl font-bold text-blue-600">42</p>
                <p className="text-gray-500">Posts</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50">
                <p className="text-3xl font-bold text-green-600">15</p>
                <p className="text-gray-500">Donations</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50">
                <p className="text-3xl font-bold text-purple-600">27</p>
                <p className="text-gray-500">Contributions</p>
              </div>
            </div>
          </motion.div>

          {/* Edit Form */}
          {isEditing && (
            <motion.div
              className={`p-6 rounded-xl shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500">Bio</label>
                  <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    rows="4"
                  />
                </div>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                  onClick={handleEditToggle}
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          )}

          {/* Logout Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={handleLogOut}
              className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-500 transition-all shadow-lg"
            >
              Log Out <i className="ri-logout-box-r-line ml-2"></i>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`p-8 rounded-xl shadow-xl text-center ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
                  onClick={confirmLogOut}
                >
                  Yes, Log Out
                </button>
                <button
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Animation */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-white text-4xl font-bold text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 1 }}
            >
              Why did you leave us alone? 😢
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default UserProfile;
