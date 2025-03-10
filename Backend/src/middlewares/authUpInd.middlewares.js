import jwt from "jsonwebtoken";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyTok = asyncHandler(async (req, res, next) => {
  let token = req.cookies.accessToken || req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; 
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const upcycledIndustry = await UpcyclingIndustry.findById(
      decodedToken._id
    ).select("phone companyName email");

    if (!upcycledIndustry) {
      throw new ApiError(401, "Unauthorized: Industry not found");
    }

    req.upcycledIndustry = upcycledIndustry; 

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyTok };
