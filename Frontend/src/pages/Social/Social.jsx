import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SoicalSlider from "../../Components/SocialSlider/SocialSlider";
import SocialNavbar from "../../Components/SocialNavbar";
import SocialDot from "../../Components/SocialDot";
import Blog from "../../Components/Blog/Blog";
import Community from "../../Components/Community/Community";
import Recipe from "../../Components/Recipe/Recipe";
import Footer from "../../Components/Footer/Footer";
import UserGuidelines from "../../Components/Guidelines/UserGuidelines";
import NgoGuidelines from "../../Components/Guidelines/NgoGuidelines";
import ProducerGuidelines from "../../Components/Guidelines/ProducerGuidelines";
import UpcyleingGuidelines from "../../Components/Guidelines/UpcyleingGuidelines";

const Social = () => {
  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setHeroCount((count) => {
        return count === 1 ? 0 : count + 1;
      });
    }, 4000);
  }, []);

  const [activeComponent, setActiveComponent] = useState("Blog");

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "Blog":
        return <Blog />;
      case "Community":
        return <Community />;
      case "Recipe":
        return <Recipe />;
      case "Guidelines":
        return <UserGuidelines />;
      case "Users":
        return <UserGuidelines />;
      case "NGOs":
        return <NgoGuidelines />;
      case "Producers":
        return <ProducerGuidelines />;
      case "Upcycling Industries":
        return <UpcyleingGuidelines />;
      default:
        return <Blog />;
    }
  };

  return (
    <div className="overflow-auto h-screen">
      <Navbar />
      <div className="ml-30 mr-30">
        <SoicalSlider heroCount={heroCount} />
        <SocialDot heroCount={heroCount} setHeroCount={setHeroCount} />
        <SocialNavbar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        {/* Display the selected component */}
        <div className="mt-10">{renderComponent()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Social;
