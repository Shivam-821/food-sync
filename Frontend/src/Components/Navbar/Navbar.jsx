import "./Navbar.css";
import profileMale from "../../assets/male.jpg";
import profileFemale from "../../assets/female.jpg";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState("male");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthToggle = () => {
    setIsLogin(!isLogin); // Toggle login state
  };

  return (
    <div className={`nav z-10 fixed top-0 left-0 w-full  ${scrolled ? "bg-sky-500/30 backdrop-blur-sm backdrop-brightness-90" : "backdrop-brightness-90"}  pl-5 pr-5 `}>
      <div className="nav-logo">
        <a href="#">FoodSync</a>
      </div>
      <ul className="nav-menu">
        <li className=" hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
          <a href="/donation">Donation</a>
          <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=" hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
          <a href="/upcycle">Upcycle</a>
          <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=" hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
          <a href="/SurplusProducer">Surplus Producer</a>
          <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=" hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
          <a href="/social">Social</a>
          <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=" hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
          <a href="/recipe">Recipe</a>
          <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=" hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block">
          <a href="/about">About</a>
          <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className="hover:text-blue-900 cursor-pointer">
          {isLogin ? (
            <img
              className="rounded-full hover:border-white size-12 hover:border-2 min-w-12 cursor-pointer transition duration-200"
              src={profile === "male" ? profileMale : profileFemale}
              alt="Profile"
            />
          ) : (
            <button
              onClick={handleAuthToggle}
              className="flex cursor-pointer items-center border-2 border-gray-600 text-white hover:bg-gray-500/50 py-1 px-3 rounded-[14px] hover:border-white hover:backdrop-brightness-200 transition duration-200"
            >
              <a href="/signup">SignUp</a>
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
