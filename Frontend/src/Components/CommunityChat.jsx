import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const socket = io("http://localhost:8004"); 

function CommunityChat() {
  const [name, setName] = useState(""); 
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("chatName") || "";
    setName(storedName);

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); 
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "" || name.trim() === "") return; 
    
    const msgData = { name, message };
    socket.emit("message", msgData); // Emit message, but don't add to state manually
    setMessage(""); // Clear input field
  };
  

  return (
    <div className="relative">
      <div className="absolute h-full w-full -z-10">
        <iframe src='https://my.spline.design/holoblobs-119b1e014a3f7fd2e0f1e8fda9f927c4/' frameBorder='0' width='100%' height='100%'></iframe>
      </div>

      <Navbar />
      <h1 className="text-3xl font-semibold text-center mt-20 mb-6">Community Chat</h1>

      <div className="flex flex-col items-center gap-4">
        <input 
          className="bg-gray-200 rounded-lg px-4 py-2 border text-lg w-3/4 sm:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" 
          value={name} 
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("chatName", e.target.value);
          }} 
          placeholder="Enter your name..."
        />
      </div>

      <div className="border border-gray-400 m-5 p-4 h-96 bg-white/80 overflow-y-auto mb-6 rounded-lg shadow-lg">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.name === name ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs p-3 m-1 rounded-lg shadow-md ${msg.name === name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
            >
              <strong className="block text-sm mb-1">{msg.name}</strong>
              <p className="text-lg">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mb-5 items-center gap-4">
        <input 
          className="bg-gray-200 rounded-lg px-4 py-2 border text-lg w-3/4 sm:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message..."
        />
        <button 
          className="bg-blue-700 text-white w-60 text-xl px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all" 
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default CommunityChat;
