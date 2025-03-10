import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import chalk from "chalk";
import { createServer } from "http";
import initializeSocket from "./socket.js"; // Import the socket setup

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3005;

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(chalk.green(`Server is running on port ${PORT}`));
    });
  })
  .catch((err) => {
    console.warn(chalk.bgYellowBright("MongoDB connection error", err));
  });

