import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";


const ProducerHome = () => {
    const [image, setImage] = useState(null);
    useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className=" h-full bg-gray-200" >
      <Navbar />
        <div className='flex mt-16 items-center justify-between p-6'>
            <div className='text-5xl font-bold'>FoodSync</div>
            <Link  to='/producerDetail'>
      <img
        className="h-20 w-20 rounded-4xl"
        src="https://imgs.search.brave.com/infROkE3qEnyLfNcO-cEkJfbiXqq4XtSkwzdwsCY_yU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/NS8xNy8yMC8yMS9j/YXQtNTE4MzQyN182/NDAuanBn"
        alt=""
      />
    </Link>
        </div>
      <div className='p-7 '>
      <h3 className='text-2xl mb-5'>Add Items</h3>
      <form className="border flex items-center flex-col rounded-lg border-black p-4 bg-white w-full max-w-4xl mx-auto">
  <div className="flex flex-wrap gap-5 justify-evenly">
    
    
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <h3 className="text-xl sm:text-2xl">Name</h3>
      <input
        required
        className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full sm:w-60"
        type="text"
        placeholder="Item name"
      />
    </div>

   
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <h3 className="text-xl sm:text-2xl">Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 bg-[#eeeeee] rounded-lg text-lg w-full sm:w-60"
      />
    </div>

    
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <h3 className="text-xl sm:text-2xl">Quantity</h3>
      <input
        required
        className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full sm:w-40"
        type="text"
        placeholder="Item Quantity"
      />
    </div>

    
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <h3 className="text-xl sm:text-2xl">Expiry Date</h3>
      <input
        required
        className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full sm:w-40"
        type="date"
      />
    </div>

  </div>
  <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-1/4  mt-5 text-lg placeholder:text-base'
            >Add Items</button>
</form>


<h3 className='text-2xl mt-5 mb-5'>Added Items</h3>

<div className="flex flex-wrap gap-9">
  <div className="flex flex-col items-center">
    <img className="h-60 hover:scale-107 hover:shadow-2xl w-60 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 hover:shadow-2xl rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 hover:shadow-2xl rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 hover:shadow-2xl rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 hover:shadow-2xl rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>
  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 hover:shadow-2xl rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  
</div>


      </div>

      

      <div>

      </div>
      <Footer/>
    </div>
  )
}

export default ProducerHome


