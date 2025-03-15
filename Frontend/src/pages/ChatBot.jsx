import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import ChatbotContainer from "../Components/Chatbot/ChatbotContainer";

const ChatBot = () => {
  return (
    <div className="overflow-auto h-screen">
      <Navbar />
      <ChatbotContainer />
    </div>
  );
};

export default ChatBot;
