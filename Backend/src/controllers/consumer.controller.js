import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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

// Register consumer
const registerConsumer = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, consumerType, location } =
    req.body;

  if (
    [username, fullname, email, password, consumerType].some(
      (field) => !field?.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingConsumer = await Consumer.findOne({
    $or: [{ email }, { username }],
  });
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
      username: username.toLowerCase(),
      fullname,
      avatar: avatar?.url || "",
      email,
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
      secure: process.env.NODE_ENV === "production",
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

// Login consumer
const loginConsumer = asyncHandler(async (req, res) => {
  console.log("Incoming Request Body:", req.body);

  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or username is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const consumer = await Consumer.findOne({ $or: [{ username }, { email }] });

  if (!consumer) {
    throw new ApiError(404, "Consumer not found");
  }

  const isPasswordValid = await consumer.isPasswordValid(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    consumer._id
  );

  const loggedInConsumer = await Consumer.findById(consumer._id).select(
    "-password -refreshToken"
  );
  if (!loggedInConsumer) {
    throw new ApiError(404, "Consumer not found");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInConsumer, accessToken, refreshToken },
        "Consumer logged in successfully"
      )
    );
});

const logoutConsumer = asyncHandler(async (req, res) => {
  await Consumer.findByIdAndUpdate(
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

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options);
});

const consumerProfile = asyncHandler(async (req, res) => {});

export { registerConsumer, loginConsumer, logoutConsumer, consumerProfile };
