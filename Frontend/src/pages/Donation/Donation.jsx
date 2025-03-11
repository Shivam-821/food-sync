import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import InputSection from "../../Components/Donation/InputSection";
import Achivements from "../../Components/Donation/Achivements";

function Donation() {
  return <div>
    <Navbar/>
    <InputSection/>
    <Achivements/>
    <Footer/>
  </div>;
}

export default Donation;
