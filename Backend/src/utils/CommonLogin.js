import { Consumer } from "../models/consumer.models.js";
import { Producer } from "../models/producer.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const generateAccessAndRefreshToken = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Token generation error: ${error.message}`);
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    throw new ApiError(400, "Email or phone is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  let user =
    (await Producer.findOne({ $or: [{ phone }, { email }] })) ||
    (await UpcyclingIndustry.findOne({ $or: [{ phone }, { email }] })) || (await Consumer.findOne({ $or: [{ phone }, { email }] }))

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user);

  const newUser =
    (await Consumer.findById(user._id)
      .select("-password -refreshToken")
      .populate("feedbacks donationsMade orders")) ||
    (await Producer.findById(user._id).populate(
      "feedbacks donationsMade items"
    )) ||
    (await UpcyclingIndustry.findById(user._id).populate(
      "feedbacks donationsMade"
    ));

  if (!newUser) {
    throw new ApiError(404, "User not found");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { newUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export { loginUser };
