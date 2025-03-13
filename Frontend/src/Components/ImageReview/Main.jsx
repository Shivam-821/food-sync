import React, { useState } from 'react'
import axios from 'axios';
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";

const Main = () => {

  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // Optional chaining prevents errors
    if (file) {
      setImage(file);
    } else {
      setImage(null); // Clear state if no file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image first");
      return;
    }
    
    const formData = new FormData();
    formData.append("image", image);
    
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/vision/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  return (
    <div className='m-16 relative min-h-[500px]'>
     <div className='flex justify-center items-center '> 
      <div className="flex-1 inset-0 pointer-events-none h-[500px] items-center">
      <Spline 
        scene="https://prod.spline.design/JSM6N5W1Kl7QUQUD/scene.splinecode" 
      />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-evenly items-center relative">
        <h2 className="text-4xl font-semibold font-serif text-white">Let's Know About Your Food</h2>
        <p className="text-xl text-white">Do you know till when you can eat any food</p>
        <form onSubmit={handleSubmit} className="p-4 h-[250px] w-[250px] pl-1 pr-1 bg-gray-800/70 mt-8 rounded-[40px] shadow-md flex flex-col justify-center items-center gap-3">
        <div className="flex justify-evenly items-center mb-4">

          {/* Image Upload Section */}
          <div className="relative flex flex-col items-center">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="fileInput" className="px-4 py-2 border border-gray-800 bg-gray-700/60 text-gray-300 rounded-md cursor-pointer ">
              Upload Image
            </label>
            {image && <p className="mt-2 text-sm text-gray-400">{image.name}</p>}
          </div>
        </div>
      <div className='flex justify-center'>
        {/* Submit Button */}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500/90 text-white cursor-pointer rounded-md" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
    </div>
  </div>
  {response && (
        <div className="mt-4 p-6 bg-gray-700 text-white rounded-md shadow-lg">
          <motion.h2 
            className="text-xl font-bold text-center mb-4 text-yellow-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Quality: {response.data.quality}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Expiry Date: {response.data.expiryDate}
          </motion.p>
          <div className="flex flex-wrap gap-2 justify-center">
            {response.data.labels.map((label, index) => (
              <motion.div
                key={index}
                className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      )}
  </div>
  )
}

export default Main