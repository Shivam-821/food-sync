import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

function CommunityChat() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const chatWindowRef = useRef(null); // Ref for the chat window

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      console.error("No token found");
      return;
    }

    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/community/communityName`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();

    // Listen for messages from the server and update localStorage
    socket.on("message", (data) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off("message");
    };
  }, []);

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !name.trim()) return;

    const msgData = { name, message };
    socket.emit("message", msgData); // Emit only, don't add manually to state
    setMessage(""); // Clear input field
  };

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold text-center mt-3 mb-6">
        Community Chat
      </h1>

      {/* Chat Window */}
      <div
        ref={chatWindowRef} // Attach the ref
        className="border border-gray-400 m-5 p-4 h-96 bg-[#faf1cf] overflow-y-auto mb-6 rounded-lg shadow-lg"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.name === name ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 m-1 rounded-lg shadow-md ${
                msg.name === name ? "bg-[#dfc770] text-white" : "bg-[#fffbeb] text-gray-900"
              }`}
            >
              <strong className="block text-sm mb-1">{msg.name}</strong>
              <p className="text-lg">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex justify-center items-center mb-5 gap-4 relative">
        <input
          className="bg-gray-200 rounded-lg px-4 py-2 border text-lg w-3/4 sm:w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents new line in input
              sendMessage();
            }
          }}
        />
        <button
          className="bg-blue-600/80  text-white w-10 text-xl p-2 rounded-full shadow-lg hover:bg-blue-600/60 transition-all"
          onClick={sendMessage}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default CommunityChat;