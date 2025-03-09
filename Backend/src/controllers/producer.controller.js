import { Producer } from "../models/producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (ProducerId) => {
  try {
    const producer = await Producer.findById(ProducerId);
    if (!producer) {
      throw new ApiError(404, "Producer not found");
    }
    const accessToken = producer.generateAccessToken();
    const refreshToken = producer.generateRefreshToken();

    producer.refreshToken = refreshToken;
    await producer.save()

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
      "-password"
    );

    if (!createdProducer) {
      throw new ApiError(
        500,
        "Something went wrong while registering a producer"
      );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      createdProducer._id
    );

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
          { user: createProducer, accessToken, refreshToken },
          "Producer registerd and logged in successfully"
        )
      );
  } catch (error) {
    if (avatar?.public_id) await deleteFromCloudinary(avatar.public_id);
    console.error("Error creating producer:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

// login
const loginProducer = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or username is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const producer = await Producer.findOne({ $or: [{ username }, { email }] });

  if (!producer) {
    throw new ApiError(404, "Producer not found");
  }

  const isPasswordValid = await producer.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    producer._id
  );

  const loggedInProducer = await Producer.findById(producer._id).select(
    "-password -refreshToken"
  );
  if (!loggedInProducer) {
    throw new ApiError(404, "Producer not found");
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
        { user: loggedInProducer, accessToken, refreshToken },
        "Producer logged in successfully"
      )
    );
});

const logoutProducer = asyncHandler(async (req, res) => {
  const producer = await Producer.findByIdAndUpdate(
    req.producer._id,
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
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Producer logout successfully"));
});

const producerProfile = asyncHandler(async (req, res) => {
  const producer = await Producer.findById(req.producer._id).select(
    "-password -refreshToken"
  );

  if (!producer) {
    throw new ApiError(404, "Producer not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, producer, "producer profile fetched successfully")
    );
});

// update profile will be added in future

export { registerProducer, loginProducer, logoutProducer, producerProfile };
