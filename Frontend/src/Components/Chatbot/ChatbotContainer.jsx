import { useState, useEffect, useRef } from "react";
import axios from "axios"; // ✅ Import axios
import rehypeHighlight from "rehype-highlight";
import Markdown from "react-markdown";

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state for the button
  const chatContainerRef = useRef(null);

  // Function to send user message and fetch bot response
  const sendMessage = async () => {
    if (!input.trim() || loading) return; // Prevent multiple requests

    setLoading(true); // ✅ Set loading to true when sending

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const userMessage = input;
    setInput("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/ai/get-review`,
        { promt: userMessage }
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
        setLoading(false); // ✅ Reset loading state after response
      }, 1000);
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response. Try again.", sender: "bot" },
      ]);
      setLoading(false); // ✅ Reset loading state on error
    }
  };

  // Send an introductory message when the component mounts
  useEffect(() => {
    const introMessage = {
      heading: "Welcome to FoodSync Bot!",
      points: [
        "I can help you with food waste management and reduction.",
        "You can ask me about food donation guidelines, surplus food distribution, upcycling, and ways to minimize waste.",
        "Want tips on reducing food waste at home? Just ask!",
        "Need help connecting with food banks or NGOs? I can assist you.",
      ],
      sender: "bot",
    };

    setMessages([introMessage]); // Set initial bot message
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className=" flex flex-col h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <div className="p-4 mt-16 text-center text-xl font-bold bg-gray-800">Chat Assistant</div>
      
      {/* Watermark */}
      <div className="absolute flex justify-center items-center h-full w-full text-8xl text-amber-50/30 pointer-events-none">
        FoodSync
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 m-10 mx-50 rounded-lg max-w-xl ${
              msg.sender === "user"
                ? "bg-blue-500 ml-auto text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            {msg.sender === "user" ? (
              <p className="text-lg">{msg.text}</p>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-yellow-400">
                  {msg.heading === "AI Response" ? "Bot" : msg.heading}
                </h2>
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
      <div className="p-4 mt-2 mb-5 mx-50 rounded-xl bg-gray-800 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-gray-700  text-white border-none focus:outline-none"
          placeholder="Ask anything..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents new line in input
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center justify-center min-w-[80px]"
          disabled={loading} // ✅ Disable button when loading
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
