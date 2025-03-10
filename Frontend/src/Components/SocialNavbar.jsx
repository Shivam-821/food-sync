import React, { useState } from "react";


const SocialNavbar = ({setActiveComponent,activeComponent}) => {
  

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-center items-center mt-10 w-full">
        <ul className="nav-menu flex justify-center gap-5">
          {[
            { name: "Blog", component: "Blog" },
            { name: "Community", component: "Community" },
            { name: "Guidelines", component: "Guidelines", hasDropdown: true },
            { name: "Recipe", component: "Recipe" }
          ].map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveComponent(item.component)}
              className={`hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group lg:block ${
                activeComponent === item.component ? "text-blue-700 pb-2" : ""
              } `}
            >
              {item.name}

              {/* Active Indicator */}
              <div
                className={`absolute bottom-0 w-full h-1 bg-black transition-all duration-200 ${
                  activeComponent === item.component
                    ? "block bg-blue-700"
                    : "hidden group-hover:block"
                }`}
              ></div>

              {/* Dropdown Menu for "Guidelines" */}
              {item.hasDropdown && (
                <div className="absolute z-10 grid grid-cols-2 -left-25 mt-2 w-70 bg-white border border-gray-100 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                  {["Users", "NGOs", "Producers", "Upcycling Industries"].map(
                    (dropdownItem, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents click from closing menu
                          setActiveComponent(dropdownItem);
                        }}
                        className=" cursor-pointer w-full px-1 py-5 text-black hover:text-blue-700 text-sm transition-all duration-200"
                      >
                        {dropdownItem}
                      </button>
                    )
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialNavbar;
