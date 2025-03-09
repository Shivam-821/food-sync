import React, { useState } from "react";


const SocialNavbar = () => {
  

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-center items-center mt-10 w-full">
        <ul className="nav-menu flex justify-center gap-5">
          {[
            { name: "Blog", component: "Blog" },
            { name: "Community", component: "Community" },
            { name: "Guidelines", component: "Guidelines" },
            { name: "Recipe", component: "Recipe" }
          ].map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveComponent(item.component)}
              className="hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group lg:block"
            >
              {item.name}
              <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block transition-all duration-200"></div>
            </li>
          ))}
        </ul>
      </div>
       
    </div>
  );
};

export default SocialNavbar;




// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link

// const SocialNavbar = () => {
//   return (
//     <div>
//       <div className="flex justify-center items-center mt-24 w-full">
//         <ul className="nav-menu flex justify-center">
//           {[
//             { name: "Blog", href: "/blog" },
//             { name: "Community", href: "/upcycle" },
//             { name: "Guidelines", href: "/SurplusProducer" },
//             { name: "Recipe", href: "/recipe" }
//           ].map((item, index) => (
//             <li key={index} className="hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
//               <Link to={item.href}>{item.name}</Link> {/* Use Link instead of <a> */}
//               <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block transition-all duration-200"></div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SocialNavbar;
