import { useEffect, useState } from "react";
import Background from "../Components/Background/Background";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import ScrollingText from "../Components/ScrollingText/ScrollingText";
import Footer from "../Components/Footer/Footer";
import Blocks from "../Components/Block/Blocks";
import ImprovedSurplusFoodSharing from "../Components/ImprovedSurplusFoodSharing/ImprovedSurplusFoodSharing";
//import "./Home.css";

const Home = () => {
  const heroData = [
    { text1: "UPCYCLED FOOD", text2: "A trend to sustain" },
    { text1: "REDUCE WASTE", text2: "nourish the planet" },
    { text1: "FOODSYNC", text2: "for a better tomorrow" },
  ];
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((count) => {
        return count === 2 ? 0 : count + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="home-background"></div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <div className="content-wrapper">
        <Navbar />
        <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
        <ScrollingText />
        <div className="blocks-container">
          <Blocks />
        </div>
        <div>
          <ImprovedSurplusFoodSharing />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
