import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemsDetail = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="font-semibold flex justify-center text-rose-800 font-serif text-5xl">
        Added Items
      </div>
      <ItemsList />
    </div>
  );
};

export default ItemsDetail;

const ItemsList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Unauthorized: No token found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/producer/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setItems(response.data.data.items || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchItems();
  }, []);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Staggered animation for each item
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center border border-gray-300 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-transform duration-300 ease-in-out"
            variants={itemVariants}
            whileHover="hover"
          >
            <img
              className="h-60 w-60 object-cover rounded-t-3xl"
              src={item.avatar}
              alt={item.name}
            />
            <div className="flex bg-yellow-400 justify-between gap-8 p-4  w-full">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name || "Unnamed Item"}
              </h3>
              <p className="text-lg font-semibold text-gray-600">
                {item.quantity || "N/A"} kg
              </p>
              
            </div>
            <div className="flex bg-yellow-400 justify-between gap-8 p-4 w-full">
              <h3>{item.category}</h3>
              <p className="font-bold">₹{item.price}</p>
            </div>
           
          </motion.div>
        ))
      ) : (
        <motion.p
          className="text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No items available.
        </motion.p>
      )}
    </motion.div>
  );
};