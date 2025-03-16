import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import ItemsDetail from "../Components/Block/ItemsDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const ProducerHome = () => {
  const [avatar, setAvatar] = useState(null);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [status, setStatus] = useState("");
  const [upcyclingOption, setUpcyclingOption] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // Loading state for adding items

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Unauthorized: No token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("quantity", quantity);
    formData.append("unit", unit);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("expiryDate", expiryDate);
    formData.append("mfDate", manufacturingDate);
    formData.append("status", status);
    formData.append("upcyclingOptions", upcyclingOption);
    formData.append("description", description);

    if (avatar) {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      formData.append("avatar", file); // ✅ Ensure correct file key
    }

    setIsAdding(true); // Start loading

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/items/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Token sent in headers
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Item added successfully!");
      setAddedItems([...addedItems, response.data]);

      // Clear form inputs
      setItemName("");
      setQuantity("");
      setUnit("");
      setPrice("");
      setCategory("");
      setExpiryDate("");
      setManufacturingDate("");
      setStatus("");
      setUpcyclingOption("");
      setDescription("");
      setAvatar(null);
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(error.response?.data?.message || "Failed to add item");
    } finally {
      setIsAdding(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Set position to top-center
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Navbar />

      <motion.div
        className="flex items-center justify-between p-6 pt-3 pb-3 mt-16 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-800">Surplus Producer</h1>
        <Link to="/producerDetail">
          <img
            className="h-20 w-20 rounded-full border-4 border-gray-300 hover:shadow-lg transition duration-300"
            src="https://imgs.search.brave.com/infROkE3qEnyLfNcO-cEkJfbiXqq4XtSkwzdwsCY_yU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8xNy8yMC8yMS9j/YXQtNTE4MzQyN182/NDAuanBn"
            alt="User Profile"
          />
        </Link>
      </motion.div>

      <div className="p-10 pt-5 mb-9">
        <motion.div
          className="bg-[url('https://cdn.pixabay.com/photo/2016/04/02/09/43/apple-1302430_1280.jpg')] p-10 rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-semibold text-gray-700 mb-6">Add Items</h3>

          <motion.form
            onSubmit={handleAddItem}
            className="rounded-xl shadow-md p-6 bg-gray-500/80 max-w-4xl mb-15 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">Name</label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="text"
                  placeholder="Item name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border rounded-lg bg-gray-200"
                />
                {avatar && (
                  <img
                    className="h-32 w-32 mt-2 rounded-lg shadow-md"
                    src={avatar}
                    alt="Preview"
                  />
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Quantity</label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="number"
                  placeholder="Item Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Unit</label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="text"
                  placeholder="e.g., kg, liters"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Price</label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="text"
                  placeholder=""
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Category</label>
                <select
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="perishable">Perishable</option>
                  <option value="non-perishable">Non-Perishable</option>
                  <option value="ready-to-eat">Ready-to-Eat</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Manufacturing Date</label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="date"
                  value={manufacturingDate}
                  onChange={(e) => setManufacturingDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Description</label>
                <textarea
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  placeholder="Item description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Expiry Date</label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Upcycling Option</label>
                <select
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  value={upcyclingOption}
                  onChange={(e) => setUpcyclingOption(e.target.value)}
                >
                  <option value="compost">Compost</option>
                  <option value="biogas">Biogas</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="smoothies">Smoothies</option>
                  <option value="beverage">Beverage</option>
                  <option value="animal feed">Animal Feed</option>
                  <option value="flour">Flour</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300 flex items-center justify-center"
              disabled={isAdding} // Disable button while adding
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAdding ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Item"
              )}
            </motion.button>
          </motion.form>
        </motion.div>

        <ItemsDetail />
      </div>

      <Footer />
    </div>
  );
};

export default ProducerHome;