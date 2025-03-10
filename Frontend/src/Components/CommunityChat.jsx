import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const socket = io("http://localhost:8004"); 

function CommunityChat() {
  const [name, setName] = useState(""); // Store sender name
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("chatName") || "";
    setName(storedName);

    socket.on("message", (data) => {
      console.log("Received:", data);
      setMessages((prevMessages) => [...prevMessages, data]); 
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "" || name.trim() === "") return; 
    
    const msgData = { name, message };
    socket.emit("message", msgData);
    setMessage(""); 
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-semibold text-center mt-20 mb-6">Community Chat</h1>

      <div className="flex flex-col items-center gap-4">
        <input 
          className="bg-gray-200 rounded-lg px-4 py-2 border text-lg placeholder:text-base w-3/4 sm:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" 
          value={name} 
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("chatName", e.target.value);
          }} 
          placeholder="Enter your name..."
        />
      </div>

      <div className="border border-gray-400 m-5 p-4 h-100 bg-zinc-400 overflow-y-auto mb-6 rounded-lg shadow-lg">
        {messages.map((msg, index) => (
          <p key={index} className="text-3xl hover:scale-101 hover:shadow shadow-yellow-400 bg-gray-300 pl-3 border rounded h-15 flex items-center mb-2">
            <strong className="text-blue-700 pr-3">{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <div className="flex flex-col mb-5 items-center gap-4">
        <input 
          className="bg-gray-200 rounded-lg px-4 py-2 border text-lg placeholder:text-base w-3/4 sm:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
