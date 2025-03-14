import React, { useEffect, useState } from 'react'
import image1 from "./../assets/producer1.jpeg"
import image2 from "./../assets/producer2.jpeg"
import image3 from "./../assets/producer3.jpeg"
import image4 from "./../assets/producer4.jpeg"
import axios from 'axios'


const ItemsDetail = () => {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className='font-semibold flex mb-5 justify-center text-rose-800 font-serif text-5xl'>
        Your Added Items
        </div>
        <ItemsList/>
      </div>
    )
  }
  
  export default ItemsDetail

  const ItemsList = () => {
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
  
          console.log(response.data.data);
          setItems(response.data.data.items || []); 
          console.log(response.data.data.items)
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
  
      fetchItems();
    }, []);
  
    return (
      <div className="flex flex-wrap gap-9">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex border bg-white border-gray-400 hover:border-gray-600 rounded-4xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col items-center"
            >
              <img
                className="h-60 w-60 rounded-4xl"
                src={item.avatar}
                alt={item.name}
              />
              <div className="flex gap-10 font-semibold mt-1">
                <h3 className="flex">{item.name || "Unnamed Item"}</h3>
                <p className="flex">{item.quantity || "N/A"}kg</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    );
  };
  

