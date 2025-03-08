import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const registerUpcyclingIndustry = asyncHandler(async (req, res) => {
  const { companyName, email, password, location, upcyclingMethods } = req.body;

  if (
    [companyName, email, password].some((field) => !field?.trim()) ||
    !location ||
    !upcyclingMethods?.length
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingIndustry = await UpcyclingIndustry.findOne({ email });
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

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          createdIndustry,
          "Upcycling industry registered successfully"
        )
      );
  } catch (error) {
    if (avatar?.public_id) await deleteFromCloudinary(avatar.public_id);
    console.error("Error creating upcycling industry:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

export { registerUpcyclingIndustry };
