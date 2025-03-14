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
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone) {
    throw new ApiError(400, "Email or phone is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    emailOrPhone);
  const isPhone = /^[6-9]\d{9}$/.test(emailOrPhone);

  if (!isEmail && !isPhone) {
    throw new ApiError(400, "Invalid email or phone number");
  }

  const user =
    (await Producer.findOne({ [isEmail ? "email" : "phone"]: emailOrPhone })) ||
    (await UpcyclingIndustry.findOne({
      [isEmail ? "email" : "phone"]: emailOrPhone,
    })) ||
    (await Consumer.findOne({ [isEmail ? "email" : "phone"]: emailOrPhone }));

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user);

  let populatedUser;
  if (user instanceof Consumer) {
    populatedUser = await Consumer.findById(user._id)
      .select("-password -refreshToken")
      .populate("feedbacks donationsMade orders");
  } else if (user instanceof Producer) {
    populatedUser = await Producer.findById(user._id)
      .select("-password -refreshToken")
      .populate("feedbacks donationsMade items");
  } else if (user instanceof UpcyclingIndustry) {
    populatedUser = await UpcyclingIndustry.findById(user._id)
      .select("-password -refreshToken")
      .populate("feedbacks donationsMade upcyclingOrders");
  }

  if (!populatedUser) {
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
        { user: populatedUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export { loginUser };
