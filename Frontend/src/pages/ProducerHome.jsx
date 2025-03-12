import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import image1 from "./../assets/producer1.jpeg"
import image2 from "./../assets/producer2.jpeg"
import image3 from "./../assets/producer3.jpeg"
import image4 from "./../assets/producer4.jpeg"
import axios from "axios";


const ProducerHome = () => {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [status, setStatus] = useState("");
  const [upcyclingOption, setUpcyclingOption] = useState("");
  const [description, setDescription] = useState("");
  const [addedItems, setAddedItems] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    
    if (!itemName || !quantity || !unit || !category || !description || !expiryDate || !manufacturingDate || !status || (status === "Upcycled" && !upcyclingOption)) {
      alert("Please fill in all required fields!");
      return;
    }
  
    const newItem = { 
      name: itemName, 
      quantity, 
      unit, 
      category, 
      expiryDate, 
      manufacturingDate, 
      status, 
      upcyclingOption, 
      description, 
      image 
    };
  
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/items/create`, newItem,{
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token
          'Content-Type': 'multipart/form-data', // Important: specify multipart form data
        }
      });
      alert("Item added successfully!");
      
      // Clear form inputs
      setItemName("");
      setQuantity("");
      setUnit("");
      setCategory("");
      setExpiryDate("");
      setManufacturingDate("");
      setStatus("");
      setUpcyclingOption("");
      setDescription("");
      setImage(null);
  
      // Optionally, update the added items list
      setAddedItems([...addedItems, response.data]);
  
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item, please try again.");
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
                {image && <img className="h-32 w-32 mt-2 rounded-lg shadow-md" src={image} alt="Preview" />}
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
                <label className="block text-lg font-medium text-gray-700">Category</label>
                <select required className="w-full p-3 border rounded-lg bg-gray-200" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="Perishable">Perishable</option>
                  <option value="Non-Perishable">Non-Perishable</option>
                  <option value="Ready-to-Eat">Ready-to-Eat</option>
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
                  <option value="Available">Available</option>
                  <option value="Expired">Expired</option>
                  <option value="Upcycled">Upcycled</option>
                </select>
              </div>
  
              
              {status === "Upcycled" && (
                <div>
                  <label className="block text-lg font-medium text-gray-700">Upcycling Option</label>
                  <select required className="w-full p-3 border rounded-lg bg-gray-200" value={upcyclingOption} onChange={(e) => setUpcyclingOption(e.target.value)}>
                    <option value="">Select Upcycling Option</option>
                    <option value="Biogas">Biogas</option>
                    <option value="Compost">Compost</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Cosmetics">Cosmetics</option>
                  </select>
                </div>
              )}
            </div>
  
            <button type="submit" className='w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300'>Add Item</button>
          </form>
        </div>
  
    <div >
    <h3 className='text-2xl mt-5 mb-5'>Added Items</h3>
  
  <div className="flex flex-wrap  gap-9">
    <div className="flex border bg-white border-gray-400 hover:border-gray-600 rounded-4xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col items-center">
      <img className="h-60  w-60 rounded-4xl" src={image1} alt="" />
      <div className="flex gap-10 font-semibold  mt-1">
      <h3 className="flex">Mangos</h3>
      <p className="flex">10kg</p>
      </div>
  
    </div>
  
    <div className="flex border bg-white border-gray-400 hover:border-gray-600 rounded-4xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col items-center">
      <img className="h-60  w-60 rounded-4xl" src={image2} alt="" />
      <div className="flex gap-10 font-semibold  mt-1">
      <h3 className="flex">Paneer</h3>
      <p className="flex">15kg</p>
      </div>
  
    </div>
  
  
    <div className="flex border bg-white border-gray-400 hover:border-gray-600 rounded-4xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col items-center">
      <img className="h-60  w-60 rounded-4xl" src={image4} alt="" />
      <div className="flex gap-10 font-semibold  mt-1">
      <h3 className="flex">Tomato</h3>
      <p className="flex">7kg</p>
      </div>
  
    </div>
  
    <div className="flex border bg-white border-gray-400 hover:border-gray-600 rounded-4xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col items-center">
      <img className="h-60  w-60 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
      <div className="flex gap-10 font-semibold  mt-1">
      <h3 className="flex">Chiken</h3>
      <p className="flex">5kg</p>
      </div>
  
    </div>
  
    <div className="flex border bg-white border-gray-400 hover:border-gray-600 rounded-4xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col items-center">
      <img className="h-60  w-60 rounded-4xl" src={image3} alt="" />
      <div className="flex gap-10 font-semibold  mt-1">
      <h3 className="flex">Burger</h3>
      <p className="flex">6kg</p>
      </div>
  
    </div>
  
    
  </div>
    </div>
  
        </div>
  
        <Footer />
      </div>
  
  );
};

export default ProducerHome;
