import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import chalk from "chalk";
import { createServer } from "http";
import initializeSocket from "./socket.js"; 
import cron from "node-cron";
import moveExpiredItems from "./utils/moveExpiredItems.js";
import changePrice from "./utils/dynamicPricing.js"

dotenv.config({
  path: "./.env",
});

setTimeout(async () => {
  try {
    console.log("Running corn for its task");
    await moveExpiredItems();
    await changePrice();
  } catch (error) {
    console.error(chalk.redBright("Error in initial task execution: ", error));
  }
}, 60 * 1000);

cron.schedule("0 * * * *", async () => {
  //console.log("Running cron job to move expired items...");

  try {
    await moveExpiredItems();
    //console.log("Expired items moved successfully.");

    await changePrice();
    //console.log("Prices of about-to-expire items updated successfully.");
  } catch (error) {
    console.error(chalk.redBright("Error in cron job: ", error));
  }
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

