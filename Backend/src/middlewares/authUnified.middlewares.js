import jwt from "jsonwebtoken";
import { Consumer } from "../models/consumer.models.js";
import { Producer } from "../models/producer.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyUnified = asyncHandler(async (req, res, next) => {
  let token = req.cookies.accessToken || req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await Consumer.findById(decodedToken._id).select(
      "phone email"
    );
    if (user) {
      req.consumer = user;
      return next();
    }

    user = await Producer.findById(decodedToken._id).select("phone email");
    if (user) {
      req.producer = user;
      return next();
    }

    user = await UpcyclingIndustry.findById(decodedToken._id).select(
      "phone companyName email"
    );
    if (user) {
      req.upcycledIndustry = user;
      return next();
    }

    throw new ApiError(401, "Unauthorized: Invalid user");
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});




export { verifyUnified };
