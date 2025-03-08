import './Navbar.css';
import profileMale from '../../assets/male.avif';
import profileFemale from '../../assets/female.avif';
import { useState } from 'react';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfile] = useState('male');

  return (
    <div className='nav'>
      <div className='nav-logo'>FoodSync</div>
      <ul className='nav-menu'>
        <li>Donation</li>
        <li>Upcycle</li>
        <li>Surplus Producer</li>
        <li>Recipe</li>
        <li>About</li>
        <li>
          <img className='rounded-full ' src={profile === 'male' ? profileMale : profileFemale} alt="Profile" />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;