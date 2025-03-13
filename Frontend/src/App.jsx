import React from "react";
import { Routes, Route } from "react-router-dom";
import ProducerHome from "./pages/ProducerHome";
import Home from "./pages/Home";
import Donation from "./Pages/Donation/Donation";
import About from "./Components/About/About";
import Recipe from "./Components/Recipe/Recipe";
import SurplusProducer from "./Components/SurplusProducer/SurplusProducer";
import Upcycle from "./pages/Upcycle";
import SignUp from "./pages/Signup/SignUp";
//import Upcycle from "./Components/Upcycle/Upcycle";
import Ask from "./pages/Ask/Ask";
import ProducerDetail from "./pages/ProducerDetail";
import Social from "./pages/Social/Social";
//import SignUp from "./pages/Signup/SignUp";
import Producer from "./pages/ProducerSignUp/Producer";
import CommunityChat from "./Components/CommunityChat";
import { Pay } from "./Components/pay";
import ConsumerProtectWrapper from "./pages/Wrapper/ConsumerProtectedWrapper";
import Feedback from "./Components/Feedback";
import UserProfile from "./Components/UserProfile";
import ImageReview from "./pages/ImageReview";
import ChatBot from "./pages/ChatBot";
import Login from "./Components/Login/Login";
import USignup from "./Components/UpcyclingSignup/USignup";

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
      <Route path="/pay" element={<Pay />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/image-review" element={<ImageReview />} />
      <Route path="/chat-bot" element={<ChatBot />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upcyclesignup" element={<USignup />} />
    </Routes>
  );
}

export default App;
