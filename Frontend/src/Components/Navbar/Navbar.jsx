import "./Navbar.css";
import profileMale from "../../assets/male.jpg";
import profileFemale from "../../assets/female.jpg";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import ThemeToggle from "../../ThemeToggle";
import UserProfile from "../UserProfile/UserProfile";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState("male");
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`nav z-10 fixed top-0 left-0 w-full  ${
        scrolled
          ? "bg-sky-500/40 backdrop-blur-sm backdrop-brightness-90"
          : "backdrop-brightness-50"
      }  pl-5 pr-5 `}
    >
      <div className={`nav-logo ${scrolled ? "text-black " : "text-white"}`}>
        <a href="/">FoodSync</a>
      </div>
      <ul className="nav-menu">
        <li
          className={` hover:pb-2 cursor-pointer font-serif  transition-all duration-200 relative group hidden lg:block ${
            scrolled ? "text-black " : "text-white"
          }  `}
        >
          <a href="/donation">Donation</a>
          <div
            className={`absolute bottom-0 w-full h-1 hidden group-hover:block  transition-all duration-200 ${
              scrolled ? "bg-black" : "bg-white"
            } `}
          ></div>
        </li>
        <li
          className={`font-serif hover:pb-2 cursor-pointer transition-all duration-200 relative group hidden lg:block ${
            scrolled ? "text-black" : "text-white"
          }  `}
        >
          <a href="/upcycle">Upcycle</a>
          <div
            className={`absolute bottom-0 w-full h-1 hidden group-hover:block  transition-all duration-200 ${
              scrolled ? "bg-black" : "bg-white"
            } `}
          ></div>
        </li>
        <li
          className={`font-serif hover:pb-2 cursor-pointer transition-all duration-200 relative group hidden lg:block ${
            scrolled ? "text-black" : "text-white"
          } `}
        >
          <a href="/SurplusProducer">Surplus Producer</a>
          <div
            className={`absolute bottom-0 w-full h-1 hidden group-hover:block  transition-all duration-200 ${
              scrolled ? "bg-black" : "bg-white"
            } `}
          ></div>
        </li>
        <li
          className={` font-serif hover:pb-2 cursor-pointer  transition-all duration-200 relative group hidden lg:block ${
            scrolled ? "text-black" : "text-white"
          }  `}
        >
          <a href="/social">Social</a>
          <div
            className={`absolute bottom-0 w-full h-1 hidden group-hover:block  transition-all duration-200 ${
              scrolled ? "bg-black" : "bg-white"
            } `}
          ></div>
        </li>
        <li
          className={` font-serif hover:pb-2 cursor-pointer transition-all duration-200 relative group hidden lg:block ${
            scrolled ? "text-black" : "text-white"
          } `}
        >
          <a href="/about">About</a>
          <div
            className={`absolute bottom-0 w-full h-1 hidden group-hover:block  transition-all duration-200 ${
              scrolled ? "bg-black" : "bg-white"
            } `}
          ></div>
        </li>

        {/* Language Selector */}
        <li className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-black px-1 py-2 rounded-lg transition hover:bg-gray-400 focus:ring focus:ring-gray-300"
          >
            <Globe size={22} className="mr-1 text-gray-700" />
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-gray-600 border border-gray-300 shadow-lg rounded-lg overflow-hidden animate-fadeIn">
              <li
                onClick={() => handleLanguageChange("en")}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-400 transition"
              >
                🇬🇧 <span className="ml-2">English</span>
              </li>
              <li
                onClick={() => handleLanguageChange("hi")}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-400 transition"
              >
                🇮🇳 <span className="ml-2">हिंदी</span>
              </li>
              <li
                onClick={() => handleLanguageChange("mni")}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-400 transition"
              >
                🇲🇲 <span className="ml-2">ꯃꯤꯇꯩꯂꯣꯟ</span>
              </li>
            </ul>
          )}
        </li>

        {/* Profile or Sign Up */}
        <li className="hover:text-blue-900 cursor-pointer">
          {isLogin ? (
            <a href="/userProfile">
              {" "}
              {/* Wrap the image with an anchor tag */}
              <img
                className="rounded-full hover:border-white size-12 hover:border-2 min-w-12 cursor-pointer transition duration-200"
                src={profile === "male" ? profileMale : profileFemale}
                alt="Profile"
              />
            </a>
          ) : (
            <button className="flex items-center border-2 border-gray-600 text-white hover:bg-gray-500/50 py-1 px-3 rounded-[14px] hover:border-white hover:backdrop-brightness-200 transition duration-200">
              <a href="/signup">{t("SignUp")}</a>
            </button>
          )}
        </li>

        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
