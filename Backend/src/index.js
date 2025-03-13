import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import chalk from "chalk";
import { createServer } from "http";
import initializeSocket from "./socket.js"; 
import cron from "node-cron";
import moveExpiredItems from "./utils/moveExpiredItems.js";

dotenv.config({
  path: "./.env",
});

cron.schedule("0 * * * *", async () => {
  console.log("Running cron job to move expired items...");
  await moveExpiredItems();
});

const PORT = process.env.PORT || 3005;

const server = createServer(app);

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

