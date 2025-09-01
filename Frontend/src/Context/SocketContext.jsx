import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_BASE_URL}`); 

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Message from server:", data);
      setMessage(data);
    });

    return () => {
      socket.off("message"); 
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", "Hello from React!");
  };

  return (
    <div>
      <h1>Socket.IO in React</h1>
      <p>Message from server: {message}</p>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
