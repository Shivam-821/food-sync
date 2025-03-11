import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import UpSlider from "../Components/Upcycle/UpSlider";
import UpInSlider from "../Components/Upcycle/UpInSlider";
import UpProducts from "../Components/Upcycle/UpProducts";
import Footer from '../Components/Footer/Footer';
import UpInAchivement from "../Components/Upcycle/UpInAchivement";

function Upcycle() {
  return <div>
    <Navbar />
    <UpSlider />
    <UpInSlider />
    <UpProducts />
    <UpInAchivement />
    <Footer />
  </div>;
}

export default Upcycle;
