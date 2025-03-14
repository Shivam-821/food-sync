import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import UpSlider from "../Components/Upcycle/UpSlider";
import UpInSlider from "../Components/Upcycle/UpInSlider";

import Footer from "../Components/Footer/Footer";
import UpInAchivement from "../Components/Upcycle/UpInAchivement";
import Up from "../Components/UpProduct/Up";

function Upcycle() {
  return (
    <div className="overflow-auto h-screen">
      <Navbar />
      <UpSlider />
      <UpInSlider />
      <Up />
      <UpInAchivement />
      <Footer />
    </div>
  );
}

export default Upcycle;
