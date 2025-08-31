import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (upcycledId) => {
  try {
    const upcycled = await UpcyclingIndustry.findById(upcycledId);
    if (!upcycled) {
      throw new ApiError(404, "Upcycling Industry not found");
    }
    const accessToken = upcycled.generateAccessToken();
    const refreshToken = upcycled.generateRefreshToken();

    upcycled.refreshToken = refreshToken;
    await upcycled.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Token generation error: ${error.message}`);
  }
};

const registerUpcyclingIndustry = asyncHandler(async (req, res) => {
  const { companyName, email, phone, password, location, upcyclingMethods } =
    req.body;

  if (
    [companyName, email, password].some((field) => !field?.trim()) ||
    !location || 
    !upcyclingMethods?.length || !phone
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingIndustry = await UpcyclingIndustry.findOne({
    $or: [{ email }, {phone}],
  });
  if (existingIndustry) {
    throw new ApiError(
      409,
      "Upcycling industry already exists with the same email"
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
    const createIndustry = await UpcyclingIndustry.create({
      companyName,
      email,
      phone,
      role: "upcyclingIndustry",
      password,
      location,
      upcyclingMethods,
      avatar: avatar?.url || "",
    });

    const createdIndustry = await UpcyclingIndustry.findById(
      createIndustry._id
    ).select("-password");

    if (!createdIndustry) {
      throw new ApiError(
        500,
        "Something went wrong while registering an upcycling industry"
      );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      createdIndustry._id
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
          { user: createdIndustry, accessToken, refreshToken },
          "UpcyclingIndustry registered and logged in successfully"
        )
      );
  } catch (error) {
    if (avatar?.public_id) await deleteFromCloudinary(avatar.public_id);
    // console.error("Error creating upcycling industry:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});


const logoutUpcycledIndustry = asyncHandler(async (req, res) => {
  await UpcyclingIndustry.findByIdAndUpdate(
    req.upcycledIndustry._id,
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
    .json(new ApiResponse(200, "UpcycledIndustry logout successfully"));
});

const UpcycledIndustryProfile = asyncHandler(async (req, res) => {
  const upcycledIndustry = await UpcyclingIndustry.findById(
    req.upcycledIndustry._id
  ).select("-password -refreshToken").populate("feedbacks")

  if (!upcycledIndustry) {
    throw new ApiError(404, "Upcycling Industry not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        upcycledIndustry,
        "Upcycling Industry profile fetched successfully"
      )
    );
});

// update profile will be added in future

export {
  registerUpcyclingIndustry,
  logoutUpcycledIndustry,
  UpcycledIndustryProfile,
};
