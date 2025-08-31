import jwt from "jsonwebtoken";
import { Ngo } from "../models/ngo.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyNgo = asyncHandler(async (req, res, next) => {
  const gettoken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!gettoken || gettoken.split(".").length !== 3) {
    throw new ApiError(402, "Unauthorized: No token provided");
  }
 
  try {
    const decodedToken = jwt.verify(gettoken, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken)
    const ngo = await Ngo.findById(decodedToken?._id)
  // console.log(ngo)
    if (!ngo) {
      throw new ApiError(401, "Unauthorized");
    }

    req.ngo = ngo;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyNgo };
