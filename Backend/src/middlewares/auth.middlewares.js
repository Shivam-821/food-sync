import jwt from "jsonwebtoken";
import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT =asyncHandler( async (req, res, next) => {
  const gettoken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!gettoken || gettoken.split(".").length !== 3) {
    throw new ApiError(402, "Unauthorized: No token provided");
  }

  try {
    const decodedToken = jwt.verify(gettoken, process.env.ACCESS_TOKEN_SECRET);
    const consumer = await Consumer.findById(decodedToken?._id).select(
      "phone email"
    );
 
    if (!consumer) {
      throw new ApiError(401, "Unauthorized");
    }

    req.consumer = consumer;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyJWT };
