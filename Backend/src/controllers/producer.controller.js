import { Producer } from "../models/producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (consumerId) => {
  try {
    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      throw new ApiError(404, "Consumer not found");
    }
    const accessToken = consumer.generateAccessToken();
    const refreshToken = consumer.generateRefreshToken();

    consumer.refreshToken = refreshToken;
    consumer.accessToken = accessToken;

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Token generation error: ${error.message}`);
  }
};

const registerProducer = asyncHandler(async (req, res) => {
  const {
    username,
    fullname,
    email,
    password,
    companyName,
    producerType,
    location,
  } = req.body;

  if (
    [username, fullname, email, password, companyName, producerType].some(
      (field) => !field?.trim()
    ) ||
    !location
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingProducer = await Producer.findOne({
    $or: [{ email }, { username }],
  });
  if (existingProducer) {
    throw new ApiError(
      409,
      "Producer already exists with the same email or username"
    );
  }

  let avatar;
  const avatarLocalPath = req.file?.path;

  if (avatarLocalPath) {
    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
    } catch (error) {
      throw new ApiError(500, `Failed to upload avatar: ${error.message}`);
    }
  }

  try {
    const createProducer = await Producer.create({
      username: username.toLowerCase(),
      fullname,
      avatar: avatar?.url || "",
      email,
      password,
      companyName,
      producerType,
      location,
    });

    const createdProducer = await Producer.findById(createProducer._id).select(
      "-password -refreshToken"
    );

    if (!createdProducer) {
      throw new ApiError(
        500,
        "Something went wrong while registering a producer"
      );
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: createProducer, accessToken, refreshToken },
          "Producer logged in successfully"
        )
      );
  } catch (error) {
    if (avatar?.public_id) await deleteFromCloudinary(avatar.public_id);
    console.error("Error creating producer:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

export { registerProducer };
