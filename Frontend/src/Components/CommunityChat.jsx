import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8004"); 

function CommunityChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Received:", data);
      setMessages((prevMessages) => [...prevMessages, data]); 
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return; 
    socket.emit("message", message);
    setMessage(""); 
  };

  return (
    <div className="">
    <h1 class="text-3xl font-semibold text-center mt-5 mb-6">Community Chat</h1>
    <div class="border border-gray-400 m-5 p-4 h-100 bg-gray-200 overflow-y-auto mb-6 rounded-lg shadow-lg">
      {messages.map((msg, index) => (
        <p   key={index} className=" text-3xl mb-2">{msg}</p> 
      ))}
    </div>
    
    <div class="flex flex-col items-center gap-4">
      <input 
        class="bg-gray-200 rounded-lg px-4 py-2 border text-lg placeholder:text-base w-3/4 sm:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message..."
      />
      <button 
        class="bg-blue-700 text-white w-60 text-xl px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all" 
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
  
  );
}

export default CommunityChat;
