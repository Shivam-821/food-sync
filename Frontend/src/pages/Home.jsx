import React, { useEffect, useState } from 'react'
import Background from '../Components/Background/Background'
import Navbar from '../Components/Navbar/Navbar';
import Hero from '../Components/Hero/Hero';
import Blocks from '../Components/blocks';


const Home = () => {
  let heroData = [
    {text1:"UPCYCLED FOOD", text2:"A tred to sustain"},
    {text1:"indulge", text2:"your passions"},
    {text1:"Give in to", text2:"your passions"},
  ]
  const [heroCount, setHeroCount]= useState(2);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(()=>{
    setInterval(()=>{
      setHeroCount((count)=>{return count===2?0:count+1})
    }, 3000);
  },[])

  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Navbar />
      <Hero 
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      ></Hero>
      <Blocks></Blocks>
    </div>
  )
    
}

export default Home;














