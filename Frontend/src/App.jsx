import React from "react";
import { Routes, Route } from "react-router-dom";
import ProducerHome from "./pages/ProducerHome";
import Home from "./pages/Home";
import Donation from "./Components/Donation/Donation";
import About from "./Components/About/About";
import Recipe from "./Components/Recipe/Recipe";
import SurplusProducer from "./Components/SurplusProducer/SurplusProducer";
import Upcycle from "./Components/Upcycle/Upcycle";
import Ask from "./pages/Ask/Ask";
import ProducerDetail from "./pages/ProducerDetail";
import Social from "./pages/Social/Social";
import SignUp from "./pages/Signup/SignUp";
import Producer from "./pages/ProducerSignUp/Producer";
import CommunityChat from "./Components/CommunityChat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/producerHome" element={<ProducerHome />} />
      <Route path="/donation" element={<Donation />} />
      <Route path="/about" element={<About />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/surplusProducer" element={<ProducerHome />} />
      <Route path="/upcycle" element={<Upcycle />} />
      <Route path="/signup" element={<Ask />} />
      <Route path="/social" element={<Social />} />
      <Route path="/producerDetail" element={<ProducerDetail />} />
      <Route path="/producer" element={<Producer />} />
      <Route path="/consumer" element={<SignUp />} />
      <Route path="/communityChat" element={<CommunityChat />} />
    </Routes>
  );
}

export default App;
