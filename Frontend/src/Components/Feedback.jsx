import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    rating: 0,
    feedback: "",
  });
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.userType || !formData.feedback) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8004/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", userType: "", rating: 0, feedback: "" });
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Server error. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Feedback Form</h2>
        <p className="text-gray-500 mb-6">We value your feedback!</p>
        {submitted ? (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-green-600 text-lg font-semibold"
          >
            🎉 Thank you for your feedback!
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* New Dropdown for User Type */}
            <motion.select
              whileFocus={{ scale: 1.05 }}
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select User Type</option>
              <option value="Consumer">Consumer</option>
              <option value="Producer">Producer</option>
              <option value="Upcycling Industry">Upcycling Industry</option>
            </motion.select>

            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <motion.div whileHover={{ scale: 1.2 }} key={index}>
                    <FaStar
                      className={`cursor-pointer text-3xl transition-all duration-200 ${
                        ratingValue <= (hover || formData.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </motion.div>
                );
              })}
            </div>

            <motion.textarea
              whileFocus={{ scale: 1.05 }}
              name="feedback"
              placeholder="Your Feedback"
              rows="4"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></motion.textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="border-4 border-white border-t-transparent rounded-full h-5 w-5"
                ></motion.div>
              ) : (
                "Submit Feedback"
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Feedback;
