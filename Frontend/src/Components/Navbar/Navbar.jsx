import './Navbar.css';
import profileMale from '../../assets/male.jpg';
import profileFemale from '../../assets/female.jpg';
import { useState } from 'react';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState('male');

  const handleAuthToggle = () => {
    setIsLogin(!isLogin); // Toggle login state
  };

  return (
    <div className='nav'>
      <div className='nav-logo'><a href='#'>FoodSync</a></div>
      <ul className='nav-menu'>
        <li className='hover:text-blue-900 cursor-pointer'><a href='#'>Donation</a><div class="absolute bottom-0 w-full h-1 bg-blue-900 hidden group-hover:block  transition-all duration-200"></div></li>
        <li className='hover:text-blue-900 cursor-pointer'><a href='#'>Upcycle</a></li>
        <li className='hover:text-blue-900 cursor-pointer'><a href='#'>Surplus Producer</a></li>
        <li className='hover:text-blue-900 cursor-pointer'><a href='#'>Recipe</a></li>
        <li className='hover:text-blue-900 cursor-pointer'><a href='#'>About</a></li>
        <li className='hover:text-blue-900 cursor-pointer'>
          {isLogin ? (
            <img className='rounded-full size-12 min-w-12' src={profile === 'male' ? profileMale : profileFemale} alt="Profile" />
          ) : (
            <button onClick={handleAuthToggle} className="flex items-center border-3 border-gray-600 rounded-xl text-white py-2 px-4 rounded hover:bg-blue-900 transition duration-200">
              Log in
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;