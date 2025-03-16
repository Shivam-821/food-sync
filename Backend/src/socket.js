import { Server } from "socket.io";
import chalk from "chalk";

let io;
const initializeSocket = (server) => {
   io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(chalk.blue(`User connected: ${socket.id}`));

   
    socket.on("message", (data) => {
      if (!data.name || !data.message) return; 

      console.log(chalk.green(`Message from ${data.name}: ${data.message}`));
      
      io.emit("message", { name: data.name, message: data.message }); 
    });


    socket.on("disconnect", () => {
      console.log(chalk.red(`User disconnected: ${socket.id}`));
    });
  });

  return io;
};

export  {initializeSocket, io}