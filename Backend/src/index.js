import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import chalk from "chalk";
import { createServer } from "http";
import { initializeSocket } from "./socket.js";
import cron from "node-cron";
import moveExpiredItems from "./utils/moveExpiredItems.js";
import changePrice from "./utils/dynamicPricing.js";

dotenv.config({
  path: "./.env",
});

setTimeout(async () => {
  try {
    console.log("Running cron for its task");
    await moveExpiredItems();
    await changePrice();
  } catch (error) {
    // console.error(chalk.redBright("Error in initial task execution: ", error));
  }
}, 60 * 1000);

cron.schedule("0 * * * *", async () => {
  try {
    await moveExpiredItems();
    await changePrice();
  } catch (error) {
    // console.error(chalk.redBright("Error in cron job: ", error));
  }
});

const PORT = process.env.PORT || 3005;
const server = createServer(app);
const io = initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(chalk.green(`Server is running on port ${PORT}`));
    });
  })
  .catch((err) => {
    console.warn(chalk.bgYellowBright("MongoDB connection error", err));
  });

export { io };
