import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDb connected successfully: ${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(chalk.bgRedBright(`MongoDB connection error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
