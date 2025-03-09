import React from "react";
import { Routes, Route } from "react-router-dom";
import ProducerHome from "./pages/ProducerHome";
import Home from "./pages/Home";
import Donation from "./Components/Donation/Donation";
import About from "./Components/About/About";
import Recipe from "./Components/Recipe/Recipe";
import SurplusProducer from "./Components/SurplusProducer/SurplusProducer";
import Upcycle from "./Components/Upcycle/Upcycle";
import SignUp from "./pages/Signup/SignUp";
import ProducerDetail from "./pages/ProducerDetail";
import Social from "./pages/Social/Social";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/producerHome" element={<ProducerHome />} />
      <Route path="/donation" element={<Donation />} />
      <Route path="/about" element={<About />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/surplusProducer" element={<SurplusProducer />} />
      <Route path="/upcycle" element={<Upcycle />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/social" element={<Social />} />
      <Route path="/producerDetail" element={<ProducerDetail />} />
    </Routes>
  );
}

export default App;
