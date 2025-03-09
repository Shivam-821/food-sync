import { useState } from "react";

const ProducerHome = () => {
    const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#3EECAC]  to-[#EE74E1] h-full" >
        <div className='flex items-center justify-between p-6'>
            <div className='text-5xl font-bold'>FoodSync</div>
            <div><img className='h-20 w-20 rounded-4xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s" alt="" /></div>
        </div>
      <div className='p-7 '>
      <h3 className='text-2xl mb-5'>Add Items</h3>
      <form className="border rounded-lg border-black p-4 bg-white w-full max-w-4xl mx-auto">
  <div className="flex flex-wrap gap-3 justify-evenly">
    
    
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
</form>


<h3 className='text-2xl mt-5 mb-5'>Added Items</h3>

<div className="flex flex-wrap gap-4">
  <div className="flex flex-col items-center">
    <img className="h-60 hover:scale-107 w-60 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>
  <div className="flex flex-col items-center">
    <img className="h-60 w-60 hover:scale-107 rounded-4xl" src="https://imgs.search.brave.com/CGjizhvSz9PL8P1qQZ7G9uDshmtbT2I5h1FHp6l-AWQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ" alt="" />
    <h3 className="flex">Chiken</h3>
    <p className="flex">5kg</p>

  </div>

  
</div>


      </div>

      

      <div>

      </div>
    </div>
  )
}

export default ProducerHome


