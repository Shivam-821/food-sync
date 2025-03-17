import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Ngo} from "../models/ngo.models.js"
import { Producer } from "../models/producer.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { Donation } from "../models/donation.models.js";


const generateAccessAndRefreshToken = async (consumerId) => {
  try {
    const consumer = await Ngo.findById(consumerId);
    if (!consumer) {
      throw new ApiError(404, "Consumer not found");
    }
    const accessToken = consumer.generateAccessToken();
    const refreshToken = consumer.generateRefreshToken();

    consumer.refreshToken = refreshToken;
    await consumer.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Token generation error: ${error.message}`);
  }
};

const createngo = asyncHandler(async (req, res) => {
    const {ownerName, ngoName, email, phone, address, password,

    } = req.body

    if(!ownerName || !ngoName || !email || !address || !password){
        throw new ApiError(400, "Please fill all the required fields")
    }

    const existingNgo = await Ngo.findOne({email})

    if(existingNgo){
        throw new ApiError(409, "Ngo already exist with same email or phone")
    }


    try {
        const ngo = await Ngo.create({
            ownerName,
            ngoName,
            email,
            phone,
            address,
            role: "ngo",
            password,
        })
    
        const createdNgo = await Ngo.findById(ngo._id).select("-password")
    
        if(!createdNgo){
            throw new ApiError(500, "Error creating Ngo")
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(createdNgo._id)
    
        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          sameSite: "None",
        };
    
        return res
          .status(201)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new ApiResponse(201, { createdNgo, accessToken, refreshToken, message: "Ngo created successfully" }));

    } catch (error) {
        console.error("Error creating consumer:  ", error)
        throw new ApiError(500, "Something went wrong: ", error)
    }
})

const logoutNgo = asyncHandler(async (req, res) => {
  const Ngo = await Ngo.findByIdAndUpdate(
    req.ngo._id,
    {
      $unset: { refreshToken: "" },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };
  console.log("reached here");

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Ngo logout successfully"));
});

const ngoProfile = asyncHandler(async (req, res) => {
  const ngo = await Ngo.findById(req.ngo._id)
    .select("-password -refreshToken")
    .populate({
      path: "feedbacks donationsMade gamification donationsReceived",
    })
    .populate({
        path: "requestMade",
        populate: {
          path: "item",
          model: "Donation", 
        },
      })

  if (!ngo) {
    throw new ApiError(404, "Ngo not found");
  }

  return res.status(200).json(new ApiResponse(200, ngo, "Ngo profile fetched successfully"));
});

const requestDonation = asyncHandler(async (req, res) => {
  const ngo = await Ngo.findById(req.ngo._id);

  if (!ngo) {
    throw new ApiError(404, "NGO not found");
  }

  const { items, donationId, donorType, donorId } = req.body;

  if (!items || !donationId || !donorType || !donorId) {
    throw new ApiError(400, "Missing required fields");
  }

  const donation = await Donation.findById(donationId);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  // Initialize donationsRequested if it doesn't exist
  if (!ngo.donationsRequested) {
    ngo.donationsRequested = [];
  }

  ngo.requestMade = true;

  // Iterate over the items array and push each item into donationsRequested
  items.forEach((item) => {
    ngo.donationsRequested.push({
      item: item._id, // Use the item's ID
      quantity: item.quantity, // Use the item's quantity
      donorType,
      donorId,
    });
  });

  await ngo.save();

  return res
    .status(200)
    .json(new ApiResponse(200, ngo, "Donation requested successfully"));
});


export {
createngo,
ngoProfile,
logoutNgo,
requestDonation,
}