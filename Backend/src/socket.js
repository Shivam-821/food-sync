import { Server } from "socket.io";
import chalk from "chalk";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(chalk.blue(`User connected: ${socket.id}`));

    
    socket.on("message", (msg) => {
      console.log(`Message received: ${msg}`);
      io.emit("message", msg); 
    });

    
    socket.on("disconnect", () => {
      console.log(chalk.red(`User disconnected: ${socket.id}`));
    });
  });

  return io;
};

export default initializeSocket;

