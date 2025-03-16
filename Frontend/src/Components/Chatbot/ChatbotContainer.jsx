import { useState, useEffect, useRef } from "react";
import axios from "axios"; // ✅ Import axios
import rehypeHighlight from "rehype-highlight"
import Markdown from "react-markdown"
import { Navigate } from "react-router-dom";

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Function to send user message and fetch bot response
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const userMessage = input;
    setInput("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/ai/get-review`
      ,{ promt: userMessage }
    );

      // Extract structured response (heading + points)
      const { heading, points } = response.data;

      // Format the bot message
      const formattedResponse = {
        heading,
        points,
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, formattedResponse]);
      }, 1000);
    } catch (err) {
      Navigate("/error")
      console.error("Error fetching data:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response. Try again.", sender: "bot" },
      ]);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className=" flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 mt-16 text-center text-xl font-bold bg-gray-800">Chat Assistant</div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-lg ${
              msg.sender === "user"
                ? "bg-blue-500 ml-auto text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            {/* User Message */}
            {msg.sender === "user" ? (
              <p className="text-lg">{msg.text}</p>
            ) : (
              // Bot Message (Formatted Response)
              <div>
                <h2 className="text-xl font-bold text-yellow-400">{msg.heading}</h2>
                <ul className="mt-2 space-y-1">
                  {msg.points.map((point, i) => (
                    <li key={i} className="text-gray-300 text-sm flex gap-2">
                      <span className="text-green-400 font-bold">✔</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-gray-800 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white border-none focus:outline-none"
          placeholder="Ask anything..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
