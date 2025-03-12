import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    username: "@FoodSync Member",
    location: "New York, USA",
    email: "jane.doe@email.com",
    phone: "+1 (555) 987-6543",
    address: "123 Greenway Street, New York, NY",
    bio: "Passionate about reducing food waste and supporting sustainability.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 mt-5 min-h-screen font-sans relative">
      <Navbar />

      <div className="max-w-6xl mx-auto py-16 px-6 relative">
        {/* Profile Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-8 mb-10 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            className="h-40 w-40 rounded-full border-4 border-gray-300 shadow-md hover:scale-105 transition-transform"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User Profile"
          />
          <div>
            <h1 className="text-4xl font-bold">{userData.name}</h1>
            <h2 className="text-xl text-gray-700">{userData.username}</h2>
            <div className="flex items-center text-gray-800 mt-2">
              <i className="ri-map-pin-line text-xl mr-2"></i>
              <span>{userData.location}</span>
            </div>
            <p className="text-gray-600 mt-2">{userData.bio}</p>
          </div>
          <button 
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition shadow-lg"
            onClick={handleEditToggle}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </motion.div>

        {/* User Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-semibold mb-2">Consumer Type</h2>
            <p className="text-gray-700">NGO</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-semibold mb-2">Address</h2>
            <p className="text-gray-700">{userData.address}</p>
          </motion.div>
        </div>

        {/* Edit Profile Section */}
        {isEditing && (
          <motion.div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-3xl font-semibold mb-2">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input type="text" name="phone" value={userData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input type="text" name="address" value={userData.address} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bio</label>
                <textarea name="bio" value={userData.bio} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" rows="4" />
              </div>
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition" onClick={handleEditToggle}>
                Save Changes
              </button>
            </form>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
