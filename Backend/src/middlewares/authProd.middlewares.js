import jwt from "jsonwebtoken";
import { Producer } from "../models/producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const gettoken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!gettoken || gettoken.split(".").length !== 3) {
    throw new ApiError(402, "Unauthorized: No token provided");
  }
 
  try {
    const decodedToken = jwt.verify(gettoken, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken)
    const producer = await Producer.findById(decodedToken?._id)
  console.log(producer)
    if (!producer) {
      throw new ApiError(401, "Unauthorized");
    }

    req.producer = producer;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyToken };
