import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import SoicalSlider from '../../Components/SocialSlider/SocialSlider'
import SocialNavbar from '../../Components/SocialNavbar'
import SocialDot from '../../Components/SocialDot'
import Blog from "../../Components/Blog";
import Community from "../../Components/Community";
import Guidelines from "../../Components/Guidelines";
import Recipe from "../../Components/Recipe/Recipe";

const Social = () => {

   const [heroCount, setHeroCount]= useState(1);
  
    useEffect(()=>{
        setInterval(()=>{
          setHeroCount((count)=>{return count===1?0:count+1})
        }, 4000);
      },[])

      const [activeComponent, setActiveComponent] = useState(null);

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "Blog":
        return <Blog />;
      case "Community":
        return <Community />;
      case "Guidelines":
        return <Guidelines />;
      case "Recipe":
        return <Recipe />;
      default:
        return <Blog />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className='ml-30 mr-30'>
        <SoicalSlider heroCount={heroCount}  />
         <SocialDot heroCount={heroCount}
          setHeroCount={setHeroCount} />
        <SocialNavbar setActiveComponent={setActiveComponent} />
        {/* Display the selected component */}
       <div className="mt-10">{renderComponent()}</div>
      </div>
      
    </div>
  )
}

export default Social