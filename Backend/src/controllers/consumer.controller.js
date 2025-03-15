import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import {Order} from "../models/order.models.js"

const generateAccessAndRefreshToken = async (consumerId) => {
  try {
    const consumer = await Consumer.findById(consumerId);
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

// Register consumer
const registerConsumer = asyncHandler(async (req, res) => {
  const { fullname, email, phone, password, consumerType, location } =
    req.body;

  if (
    [fullname, email, password, consumerType].some(
      (field) => !field?.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingConsumer = await Consumer.findOne({email});
  if (existingConsumer) {
    throw new ApiError(
      409,
      "Consumer already exists with the same email or username"
    );
  }

  let avatar;
  const avatarLocalPath = req.file?.path;

  try {
    if (avatarLocalPath) {
      avatar = await uploadOnCloudinary(avatarLocalPath);
    }
 
    const createConsumer = await Consumer.create({
      fullname,
      avatar: avatar?.url || "",
      email,
      phone: phone || 9000000000,
      role: "consumer",
      password,
      location: location || "",
      consumerType,
    });

    const createdConsumer = await Consumer.findById(createConsumer._id).select(
      "-password"
    );
    if (!createdConsumer) {
      throw new ApiError(500, "Error registering consumer");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      createdConsumer._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "None",
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          { user: createdConsumer, accessToken, refreshToken },
          "Consumer registered and logged in successfully"
        )
      );
  } catch (error) {
    if (avatar?.public_id) {
      await deleteFromCloudinary(avatar.public_id);
    }
    console.error("Error creating consumer:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

const logoutConsumer = asyncHandler(async (req, res) => {
  const consumer = await Consumer.findByIdAndUpdate(
    req.consumer._id,
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
    .json(new ApiResponse(200, "Consumer logout successfully"));
});

const consumerProfile = asyncHandler(async (req, res) => {
  const consumer = await Consumer.findById(req.consumer._id)
    .select("-password -refreshToken")
    .populate({
      path: "feedbacks donationsMade gamification",
    })
    .populate({
        path: "orders",
        populate: {
          path: "items.item",
          model: "Item", 
        },
      })

  if (!consumer) {
    throw new ApiError(404, "Consumer not found");
  }

  return res.status(200).json(new ApiResponse(200, consumer, "Consumer profile fetched successfully"));
});

// update profile will be added in future

export { registerConsumer, logoutConsumer, consumerProfile };
