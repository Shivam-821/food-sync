import React from 'react'

const ItemsDetail = () => {
  return (
    <div>
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
  )
}

export default ItemsDetail
