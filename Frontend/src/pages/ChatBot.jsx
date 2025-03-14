import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ChatbotContainer from "../Components/Chatbot/ChatbotContainer";

const ChatBot = () => {
  return (
    <div className="overflow-auto h-screen">
      <Navbar />
      <ChatbotContainer />
      <Footer />
    </div>
  );
};

export default ChatBot;
