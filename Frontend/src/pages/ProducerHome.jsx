import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import ItemsDetail from "../Components/ItemsDetail";


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
  const [price, serPrice] = useState("");
  const [addedItems, setAddedItems] = useState([]);

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
      alert("Unauthorized: No token found. Please log in again.");
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
      const fileInput = document.querySelector('input[type="file"]')
      const file = fileInput.files[0];
      formData.append("avatar", file); // ✅ Ensure correct file key
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/items/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Token sent in headers
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      
      
  
      alert("Item added successfully!");
      setAddedItems([...addedItems, response.data]);
  
      // Clear form inputs
      setItemName("");
      setQuantity("");
      setUnit("");
      serPrice("");
      setCategory("");
      setExpiryDate("");
      setManufacturingDate("");
      setStatus("");
      setUpcyclingOption("");
      setDescription("");
      setAvatar(null);
    } catch (error) {
      console.error("Error adding item:", error);
      alert(error.response?.data?.message || "Failed to add item");
    }
  };
  
  
  
  

  return (
  
  
      <div className="min-h-screen bg-gray-100  font-sans">
        <Navbar />
        
        <div className='flex items-center justify-between p-6 pt-3 pb-3 mt-16  shadow-md'>
          <h1 className='text-5xl font-extrabold text-gray-800'>Surplus Producer</h1>
          <Link to='/producerDetail'>
            <img className="h-20 w-20 rounded-full border-4 border-gray-300 hover:shadow-lg transition duration-300" 
                 src="https://imgs.search.brave.com/infROkE3qEnyLfNcO-cEkJfbiXqq4XtSkwzdwsCY_yU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8xNy8yMC8yMS9j/YXQtNTE4MzQyN182/NDAuanBn" 
                 alt="User Profile" />
          </Link>
        </div>
  
        <div className='p-10 pt-5 mb-9'>
        <div className="bg-[url('https://cdn.pixabay.com/photo/2016/04/02/09/43/apple-1302430_1280.jpg')] p-10 rounded-2xl">
        <h3 className='text-3xl font-semibold text-gray-700 mb-6'>Add Items</h3>
          
          <form onSubmit={handleAddItem} className=" rounded-xl  shadow-md p-6 bg-gray-500/80 max-w-4xl mb-15 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Name</label>
                <input required className="w-full p-3 border rounded-lg bg-gray-200" type="text" placeholder="Item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded-lg bg-gray-200" />
                {avatar && <img className="h-32 w-32 mt-2 rounded-lg shadow-md" src={avatar} alt="Preview" />}
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Quantity</label>
                <input required className="w-full p-3 border rounded-lg bg-gray-200" type="number" placeholder="Item Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Unit</label>
                <input required className="w-full p-3 border rounded-lg bg-gray-200" type="text" placeholder="e.g., kg, liters" value={unit} onChange={(e) => setUnit(e.target.value)} />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Price</label>
                <input required className="w-full p-3 border rounded-lg bg-gray-200" type="text" placeholder="" value={price} onChange={(e) => serPrice(e.target.value)} />
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Category</label>
                <select required className="w-full p-3 border rounded-lg bg-gray-200" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="perishable">Perishable</option>
                  <option value="non-perishable">Non-Perishable</option>
                  <option value="ready-to-eat">Ready-to-Eat</option>
                </select>
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Manufacturing Date</label>
                <input required className="w-full p-3 border rounded-lg bg-gray-200" type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Description</label>
                <textarea required className="w-full p-3 border rounded-lg bg-gray-200" placeholder="Item description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Expiry Date</label>
                <input required className="w-full p-3 border rounded-lg bg-gray-200" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              </div>
  
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Status</label>
                <select required className="w-full p-3 border rounded-lg bg-gray-200" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="available">Available</option>
                  <option value="expired">Expired</option>
                  <option value="upcycled">Upcycled</option>
                </select>
              </div>
  
              
              {(
                <div>
                  <label className="block text-lg font-medium text-gray-700">Upcycling Option</label>
                  <select  className="w-full p-3 border rounded-lg bg-gray-200" value={upcyclingOption} onChange={(e) => setUpcyclingOption(e.target.value)}>
                    {/* <option value="">Select Upcycling Option</option> */}
                    <option value="compost">Compost</option>
                    <option value="biogas">Biogas</option>
                    
                    <option value="fertilizer">Fertilizer</option>
                    <option value="cosmetics">Cosmetics</option>
                  </select>
                </div>
              )}
            </div>
  
            <button type="submit" className='w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300'>Add Item</button>
          </form>
        </div>
  
    <ItemsDetail/>
  
        </div>
  
        <Footer />
      </div>
  
  );
};

export default ProducerHome;
