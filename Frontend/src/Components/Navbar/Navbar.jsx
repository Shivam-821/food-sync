import './Navbar.css';
import profileMale from '../../assets/male.jpg';
import profileFemale from '../../assets/female.jpg';
import { useState } from 'react';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfile] = useState('male');

  const handleAuthToggle = () => {
    setIsLogin(!isLogin); // Toggle login state
  };

  return (
    <div className='nav fixed top-0 left-0 w-full backdrop-blur-xs backdrop-brightness-90 pl-5 pr-5'>
      <div className='nav-logo'><a className='text-black' href='#'>FoodSync</a></div>
      <ul className='nav-menu'>
        <li className=' hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block'><a href='#'>Donation</a><div className="absolute bottom-0 w-full h-1  bg-black hidden group-hover:block  transition-all duration-200"></div></li>
        <li className=' hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block'><a href='#'>Upcycle</a>
        <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=' hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block'><a href='#'>Surplus Producer</a>
        <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=' hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block'><a href='#'>Recipe</a>
        <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className=' hover:pb-2 cursor-pointer text-black transition-all duration-200 relative group hidden lg:block'><a href='#'>About</a>
        <div className="absolute bottom-0 w-full h-1 bg-black hidden group-hover:block  transition-all duration-200"></div>
        </li>
        <li className='hover:text-blue-900 cursor-pointer'>
          {isLogin ? (
            <img className='rounded-full hover:border-white size-12 hover:border-2 min-w-12 cursor-pointer transition duration-200' src={profile === 'male' ? profileMale : profileFemale} alt="Profile" />
          ) : (
            <button onClick={handleAuthToggle} className="flex cursor-pointer items-center border-2 border-gray-600 text-white py-1 px-3 rounded-[14px] hover:border-white hover:backdrop-brightness-200 transition duration-200">
              Log in
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;