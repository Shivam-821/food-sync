import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import chalk from "chalk";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3005;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green("Server is listening at port ${PORT})"));
    });
  })
  .catch((err) => {
    console.warn(chalk.bgYellowBright("MongoDB connection error", err));
  });
