import { asyncHandler } from "../utils/asyncHandler.js";
import { Donation } from "../models/donation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Gamification } from "../models/gamification.models.js";
import { Consumer } from "../models/consumer.models.js";
import {Producer} from "../models/producer.models.js"
import {UpcyclingIndustry} from "../models/upcyclingIndustry.models.js"
import { Ngo } from "../models/ngo.models.js";

const getUserAndType = async (req) => {
  if (req.consumer)
    return {
      user: await Consumer.findById(req.consumer._id),
      userType: "Consumer",
    };
  if (req.producer)
    return {
      user: await Producer.findById(req.producer._id),
      userType: "Producer",
    };
  if (req.upcycledIndustry)
    return {
      user: await UpcyclingIndustry.findById(req.upcycledIndustry._id),
      userType: "UpcyclingIndustry",
    };
    if (req.ngo){
      return {
        user: await Ngo.findById(req.ngo._id),
        userType: "Ngo"
      }
    }
  return { user: null, userType: null };
};

const getGamification = asyncHandler(async (req, res) => {
  const { user, userType } = await getUserAndType(req);

  if (!user || !userType) {
    throw new ApiError(404, "User not found");
  }

  const usergamiDetails = await Gamification.findOne({ user: user._id }).populate({path:"user",select:"email phone fullname avatar"});


  const gamification = await Gamification.find()
    .sort({ points: -1 })
    .limit(10)
    .populate({
      path: "user",
      select: "email phone fullname avatar",
    });

  if (!gamification.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No gamification data available"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { usergamiDetails, gamification },
        "list of all donor"
      )
    );
});

export { getGamification };
