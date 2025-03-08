import React from 'react'

const Blocks = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
             {/* <!-- box1 --> */}
             <div className="w-full min-h-[15rem] relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
               <img src="./images/payment-link-icon.svg" alt="" className="bg-blue-500 absolute right-3 top-3 w-12 h-12 rounded-full z-[8] transition-all duration-200"/>
               {/* <!--box shape--> */}
               <svg
                viewBox="0 0 349.32501220703125 225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="stroke-1 stroke-[#818597] h-full w-full absolute z-[9] transition-all duration-200"
                style={{ strokeOpacity: 0.15 }}  // Changed here
              >
                <path
                  d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
                  fill="#fff"
                ></path>
              </svg>
     
               {/* <!-- box content --> */}
                <div className="z-[100] absolute w-full h-full flex flex-col justify-between pl-5 py-6 pr-8">
                 {/* <!-- text content --> */}
                 <div>
                   <h3 className="font-mullish font-bold text-blue-950 leading-[1.2] text-[1.375rem]">Payment Links</h3>
                   <p className="font-mullish text-gray-500 mt-6">Share payment link via an email, SMS, messenger, chatbot etc. and get paid immediately</p>
                 </div>
                 {/* <!-- hyperlink know more --> */}
                 <div className="flex items-center cursor-pointer group">
                   <a href="#" className="font-mullish font-bold text-blue-500 group-hover:text-gray-50 transition-all duration-200">Know More</a>
                   <i data-feather="chevron-right" className="w-5 h-5 text-blue-500 group-hover:text-gray-50 transition-all duration-200"></i>
                 </div>
     
     
              </div>
              </div>
              {/* <!-- box2 --> */}
              <div className="w-full min-h-[15rem] relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
               <img src="./images/payment-link-icon.svg" alt="" className="bg-blue-500 absolute right-3 top-3 w-12 h-12 rounded-full z-[8] transition-all duration-200"/>
               {/* <!--box shape--> */}
               <svg
                viewBox="0 0 349.32501220703125 225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="stroke-1 stroke-[#818597] h-full w-full absolute z-[9] transition-all duration-200"
                style={{ strokeOpacity: 0.15 }}  // Changed here
              >
                <path
                  d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
                  fill="#fff"
                ></path>
              </svg>
     
               {/* <!-- box content --> */}
                <div className="z-[100] absolute w-full h-full flex flex-col justify-between pl-5 py-6 pr-8">
                 {/* <!-- text content --> */}
                 <div>
                   <h3 className="font-mullish font-bold text-blue-950 leading-[1.2] text-[1.375rem]">Payment Links</h3>
                   <p className="font-mullish text-gray-500 mt-6">Share payment link via an email, SMS, messenger, chatbot etc. and get paid immediately</p>
                 </div>
                 {/* <!-- hyperlink know more --> */}
                 <div className="flex items-center cursor-pointer group">
                   <a href="#" className="font-mullish font-bold text-blue-500 group-hover:text-gray-50 transition-all duration-200">Know More</a>
                   <i data-feather="chevron-right" className="w-5 h-5 text-blue-500 group-hover:text-gray-50 transition-all duration-200"></i>
                 </div>
     
     
              </div>
              </div>
              {/* <!-- box3 --> */}
              <div className="w-full min-h-[15rem] relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
               <img src="./images/payment-link-icon.svg" alt="" className="bg-blue-500 absolute right-3 top-3 w-12 h-12 rounded-full z-[8] transition-all duration-200"/>
               {/* <!--box shape--> */}
               <svg
                viewBox="0 0 349.32501220703125 225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="stroke-1 stroke-[#818597] h-full w-full absolute z-[9] transition-all duration-200"
                style={{ strokeOpacity: 0.15 }}  // Changed here
              >
                <path
                  d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
                  fill="#fff"
                ></path>
              </svg>
     
               {/* <!-- box content --> */}
                <div className="z-[100] absolute w-full h-full flex flex-col justify-between pl-5 py-6 pr-8">
                 {/* <!-- text content --> */}
                 <div>
                   <h3 className="font-mullish font-bold text-blue-950 leading-[1.2] text-[1.375rem]">Payment Links</h3>
                   <p className="font-mullish text-gray-500 mt-6">Share payment link via an email, SMS, messenger, chatbot etc. and get paid immediately</p>
                 </div>
                 {/* <!-- hyperlink know more --> */}
                 <div className="flex items-center cursor-pointer group">
                   <a href="#" className="font-mullish font-bold text-blue-500 group-hover:text-gray-50 transition-all duration-200">Know More</a>
                   <i data-feather="chevron-right" className="w-5 h-5 text-blue-500 group-hover:text-gray-50 transition-all duration-200"></i>
                 </div>
     
     
              </div>
              </div>
              {/* <!-- box4  --> */}
              <div className="w-full min-h-[15rem] relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
               <img src="./images/payment-link-icon.svg" alt="" className="bg-blue-500 absolute right-3 top-3 w-12 h-12 rounded-full z-[8] transition-all duration-200"/>
               {/* <!--box shape--> */}
               <svg
                viewBox="0 0 349.32501220703125 225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="stroke-1 stroke-[#818597] h-full w-full absolute z-[9] transition-all duration-200"
                style={{ strokeOpacity: 0.15 }}  // Changed here
              >
                <path
                  d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
                  fill="#fff"
                ></path>
              </svg>
     
               {/* <!-- box content --> */}
                <div className="z-[100] absolute w-full h-full flex flex-col justify-between pl-5 py-6 pr-8">
                 {/* <!-- text content --> */}
                 <div>
                   <h3 className="font-mullish font-bold text-blue-950 leading-[1.2] text-[1.375rem]">Payment Links</h3>
                   <p className="font-mullish text-gray-500 mt-6">Share payment link via an email, SMS, messenger, chatbot etc. and get paid immediately</p>
                 </div>
                 {/* <!-- hyperlink know more --> */}
                 <div className="flex items-center cursor-pointer group">
                   <a href="#" className="font-mullish font-bold text-blue-500 group-hover:text-gray-50 transition-all duration-200">Know More</a>
                   <i data-feather="chevron-right" className="w-5 h-5 text-blue-500 group-hover:text-gray-50 transition-all duration-200"></i>
                 </div>
     
     
              </div>
              </div>
              {/* <!-- box5 --> */}
              <div className="w-full min-h-[15rem] relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
               <img src="./images/payment-link-icon.svg" alt="" className="bg-blue-500 absolute right-3 top-3 w-12 h-12 rounded-full z-[8] transition-all duration-200"/>
               {/* <!--box shape--> */}
               <svg
                viewBox="0 0 349.32501220703125 225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="stroke-1 stroke-[#818597] h-full w-full absolute z-[9] transition-all duration-200"
                style={{ strokeOpacity: 0.15 }}  // Changed here
              >
                <path
                  d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
                  fill="#fff"
                ></path>
              </svg>
     
               {/* <!-- box content --> */}
                <div className="z-[100] absolute w-full h-full flex flex-col justify-between pl-5 py-6 pr-8">
                 {/* <!-- text content --> */}
                 <div>
                   <h3 className="font-mullish font-bold text-blue-950 leading-[1.2] text-[1.375rem]">Payment Links</h3>
                   <p className="font-mullish text-gray-500 mt-6">Share payment link via an email, SMS, messenger, chatbot etc. and get paid immediately</p>
                 </div>
                 {/* <!-- hyperlink know more --> */}
                 <div className="flex items-center cursor-pointer group">
                   <a href="#" className="font-mullish font-bold text-blue-500 group-hover:text-gray-50 transition-all duration-200">Know More</a>
                   <i data-feather="chevron-right" className="w-5 h-5 text-blue-500 group-hover:text-gray-50 transition-all duration-200"></i>
                 </div>
     
     
              </div>
              </div>
              {/* <!-- box6 --> */}
              <div className="w-full min-h-[15rem] relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
               <img src="./images/payment-link-icon.svg" alt="" className="bg-blue-500 absolute right-3 top-3 w-12 h-12 rounded-full z-[8] transition-all duration-200"/>
               {/* <!--box shape--> */}
               <svg
                viewBox="0 0 349.32501220703125 225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="stroke-1 stroke-[#818597] h-full w-full absolute z-[9] transition-all duration-200"
                style={{ strokeOpacity: 0.15 }}  // Changed here
              >
                <path
                  d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
                  fill="#fff"
                ></path>
              </svg>
     
               {/* <!-- box content --> */}
                <div className="z-[100] absolute w-full h-full flex flex-col justify-between pl-5 py-6 pr-8">
                 {/* <!-- text content --> */}
                 <div>
                   <h3 className="font-mullish font-bold text-blue-950 leading-[1.2] text-[1.375rem]">Payment Links</h3>
                   <p className="font-mullish text-gray-500 mt-6">Share payment link via an email, SMS, messenger, chatbot etc. and get paid immediately</p>
                 </div>
                 {/* <!-- hyperlink know more --> */}
                 <div className="flex items-center cursor-pointer group">
                   <a href="#" className="font-mullish font-bold text-blue-500 group-hover:text-gray-50 transition-all duration-200">Know More</a>
                   <i data-feather="chevron-right" className="w-5 h-5 text-blue-500 group-hover:text-gray-50 transition-all duration-200"></i>
                 </div>
     
     
              </div>
              </div>
           </div >
    </div>
  )
}

export default Blocks