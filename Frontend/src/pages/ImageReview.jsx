import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Main from "../Components/ImageReview/Main";

const ImageReview = () => {
  return (
    <div className="bg-black overflow-auto h-screen">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default ImageReview;
