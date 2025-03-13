import { asyncHandler } from "../utils/asyncHandler.js";
import { Donation } from "../models/donation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Gamification } from "../models/gamification.models.js";

const getGamification = asyncHandler(async (req, res) => {
    const gamification = await Gamification.find().sort({points: -1}).limit(10).populate({
        path: "user",
        select: "email phone fullname"
    })
    
    if(!gamification.length){
        return res
          .status(200)
          .json(new ApiResponse(200, [], "No gamification data available"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, gamification, "list of all donor"))

})

export {getGamification}