import React from "react";
import { Routes, Route } from "react-router-dom";
import ProducerHome from "./pages/ProducerHome";
import Home from "./pages/Home";
import Donation from "./pages/Donation/Donation";
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
import CommunityChat from "./Components/CommunityChat/CommunityChat";
import { Pay } from "./Components/Block/pay";
import ConsumerProtectWrapper from "./pages/Wrapper/ConsumerProtectedWrapper";
import Feedback from "./Components/Feedback/Feedback";
import UserProfile from "./Components/UserProfile/UserProfile";
import ImageReview from "./pages/ImageReview";
import ChatBot from "./pages/ChatBot";
import Login from "./Components/Login/Login";
import USignup from "./Components/UpcyclingSignup/USignup";
import GamificationPage from "./pages/Gamification/gamification-page";
import { Upay } from "./Components/UpProduct/Upay";
import Error from "./pages/Error";
import GoogleMapsRoute from "./Components/Maps";
import StartUp from "./pages/StartUp";
import VisionComponent from "./Components/VisionStick";
import AuthProtectWrapper from "./pages/Wrapper/UniProtectedWrapper";
import ProducerProtectWrapper from "./pages/Wrapper/ProducerProtectedWrapper";
import UpcyclingProtectWrapper from "./pages/Wrapper/UpcyclingProtectedWrapper";
import NGOSignUp from "./pages/NgoSignup";
import NgoProfile from "./pages/NgoProfile";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/producerHome"
          element={
            <ProducerProtectWrapper>
              <ProducerHome />
            </ProducerProtectWrapper>
          }
        />
        <Route
          path="/donation"
          element={
            <AuthProtectWrapper>
              <Donation />
            </AuthProtectWrapper>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route
          path="/surplusProducer"
          element={
            <ProducerProtectWrapper>
              <ProducerHome />
            </ProducerProtectWrapper>
          }
        />
        <Route path="/upcycle" element={<Upcycle />} />
        <Route path="/signup" element={<Ask />} />
        <Route path="/social" element={<Social />} />
        <Route
          path="/producerDetail"
          element={
            <ProducerProtectWrapper>
              <ProducerDetail />
            </ProducerProtectWrapper>
          }
        />
        <Route path="/producer" element={<Producer />} />
        <Route path="/consumer" element={<SignUp />} />
        <Route path="/communityChat" element={<CommunityChat />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/upcyclepay" element={<Upay />} />
        <Route
          path="/feedback"
          element={
            <AuthProtectWrapper>
              <Feedback />
            </AuthProtectWrapper>
          }
        />
        <Route
          path="/userProfile"
          element={
            <AuthProtectWrapper>
              <UserProfile />
            </AuthProtectWrapper>
          }
        />
        <Route path="/image-review" element={<ImageReview />} />
        <Route path="/chat-bot" element={<ChatBot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upcyclesignup" element={<USignup />} />
        <Route
          path="/gamification"
          element={
            <AuthProtectWrapper>
              <GamificationPage />
            </AuthProtectWrapper>
          }
        />
        <Route  path="/error" element={<Error />} />
        <Route path="/maps" element={<GoogleMapsRoute />} />
        <Route path="/startUp" element={<StartUp />} />
        <Route path="/ngosignup" element={<NGOSignUp />} />
        <Route path="/ngoprofile" element={
          <AuthProtectWrapper>
            <NgoProfile />
          </AuthProtectWrapper>
        } />
      </Routes>
      <VisionComponent />
    </div>
  );
}

export default App;
