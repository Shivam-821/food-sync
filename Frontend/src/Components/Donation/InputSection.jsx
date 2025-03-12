import React, { useState } from 'react';
import axios from 'axios';
import Spline from '@splinetool/react-spline';

const InputSection = () => {
  const [foodItems, setFoodItems] = useState([
    { name: "", quantity: "", image: null, imagePreview: null }
  ]);
  const [address, setAddress] = useState("");  // New state for Address
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...foodItems];
    updatedItems[index][name] = value;
    setFoodItems(updatedItems);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedItems = [...foodItems];
      updatedItems[index].image = file;
      updatedItems[index].imagePreview = URL.createObjectURL(file);
      setFoodItems(updatedItems);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);  // Handle address change
  };

  const addMoreFields = () => {
    setFoodItems([...foodItems, { name: "", quantity: "", image: null, imagePreview: null }]);
  };

  const validateForm = () => {
    let newErrors = {};
    foodItems.forEach((item, index) => {
      if (!item.name.trim()) newErrors[`name-${index}`] = "Food name is required.";
      if (!item.quantity.trim()) newErrors[`quantity-${index}`] = "Quantity is required.";
    });
    if (!address.trim()) newErrors["address"] = "Address is required.";  // Validate address
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const formData = new FormData();

    formData.append("items", JSON.stringify(foodItems.map(item => ({
      name: item.name,
      quantity: parseFloat(item.quantity.replace(/[^\d.]/g, '')), // ✅ Converts "5kg" to 5
      image: item.image ? item.image.name : "", // Handle image separately
    }))));
    
    foodItems.forEach((item) => {
      if (item.image) {
        formData.append("image", item.image); // ✅ Correct field name
      }
    });
    
    formData.append("address", address);
    // Append address to form data
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/donation/create-donation`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token
          'Content-Type': 'multipart/form-data', // Important: specify multipart form data
        }
      });
      
      if (!token) {
        alert("You must be logged in to donate food.");
        return;
      }
  
    
  
      if (response.status === 201) {
        alert("Food donation successful!");
        setFoodItems([{ name: "", quantity: "", image: null, imagePreview: null }]); // Clear form
        setAddress("");  // Clear the address field
      } else {
        alert("Error during donation. Please try again.");
      }
    } catch (error) {
      console.error("Error during donation:", error);
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative mt-16 min-h-[500px]">
      {/* Background Spline */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Spline scene="https://prod.spline.design/Q01OPdEDVaHO7O25/scene.splinecode" />
      </div>

      {/* Foreground Content */}
      <div className="p-5 flex flex-col justify-center items-center relative">
        <h2 className="text-4xl font-semibold font-serif">Let's Donate Food</h2>
        <p className="text-xl">Your waste food will be a treasure for someone</p>

        <div className='flex items-center h-[300px]'>
          <form onSubmit={handleSubmit} className="p-4 pl-1 pr-1 bg-gray-800/70 mt-8 rounded-[40px] shadow-md w-[1000px]">
            {foodItems.map((item, index) => (
              <div key={index} className="flex justify-evenly items-center mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full backdrop-brightness-75 p-2 pt-3 bg-gray-700/30 border border-gray-800 rounded-md peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-0 text-gray-200"
                    placeholder=" "
                  />
                  <label className={`absolute cursor-text -z-0 left-2 top-1 text-gray-400 transition-all peer-placeholder-shown:top-1/5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}>
                    Name Of Food
                  </label>
                  {errors[`name-${index}`] && <p className="text-red-500">{errors[`name-${index}`]}</p>}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full backdrop-brightness-75 p-2 pt-3 bg-gray-700/30 border border-gray-800 rounded-md peer text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
                    placeholder=" "
                  />
                  <label className={`absolute cursor-text -z-0 left-2 top-1 text-gray-400 transition-all peer-placeholder-shown:top-1/5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}>
                    Quantity
                  </label>
                  {errors[`quantity-${index}`] && <p className="text-red-500">{errors[`quantity-${index}`]}</p>}
                </div>

                {/* Image Upload Section */}
                <div className="relative flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    id={`fileInput-${index}`}
                    className="hidden"
                  />
                  <label htmlFor={`fileInput-${index}`} className="px-4 py-2 border border-gray-800 bg-gray-700/60 text-gray-300 rounded-md cursor-pointer">
                    Upload Image
                  </label>
                </div>

                {/* Image Preview */}
                <div className="">
                  {item.imagePreview && (
                    <img src={item.imagePreview} alt="Preview" className="h-15 rounded-md shadow-md" />
                  )}
                </div>
              </div>
            ))}

            {/* Address Field */}
            <div className="relative mb-4">
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                className="w-full backdrop-brightness-75 p-2 pt-3 bg-gray-700/30 border border-gray-800 rounded-md peer text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
                placeholder=" "
              />
              <label className={`absolute cursor-text -z-0 left-2 top-1 text-gray-400 transition-all peer-placeholder-shown:top-1/5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}>
                Address
              </label>
              {errors["address"] && <p className="text-red-500">{errors["address"]}</p>}
            </div>

            {/* Add More Button */}
            <div className='flex justify-center'>
              <button type="button" onClick={addMoreFields} className="mt-4 px-4 py-2 bg-green-500/90 cursor-pointer text-white rounded-md mr-6">
                Add More Food
              </button>

              {/* Submit Button */}
              <button type="submit" className="mt-4 px-4 py-2 bg-blue-500/90 text-white cursor-pointer rounded-md" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
