import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import InputSection from "../../Components/Donation/InputSection";
import Achivements from "../../Components/Donation/Achivements";
import UserAddedDonation from "../../Components/Donation/UserAddedDonation";
import Upcycleawarenss from "../../Components/Upcycleawarenss/Upcycleawarenss";

function Donation() {
  return (
    <div className="overflow-auto h-screen">
      <Navbar />
      <InputSection />
      <Achivements />
      <UserAddedDonation />
      <Footer />
      <Upcycleawarenss />
    </div>
  );
}

export default Donation;
