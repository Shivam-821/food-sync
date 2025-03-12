import { Feedback } from "../models/feedback.models.js";
import { Producer } from "../models/producer.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  return { user: null, userType: null };
};

const createFeedback = asyncHandler(async (req, res) => {
  const { user, userType } = await getUserAndType(req);
  if (!user) throw new ApiError(404, "User not found");

  const { comment, rating } = req.body;
  if (!rating) throw new ApiError(400, "Feedback must include a rating");

  const existingFeedback = await Feedback.findOne({ user: user._id });
  if (existingFeedback)
    throw new ApiError(403, "You have already given feedback");

  const feedback = await Feedback.create({
    comment: comment || "",
    rating,
    user: user._id,
    userType,
  });

  user.feedbacks.push(feedback._id);
  await user.save();

  if (!feedback) throw new ApiError(500, "Failed to create feedback");

  return res
    .status(201)
    .json(new ApiResponse(201, feedback, "Feedback submitted successfully"));
});

const updateFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;
  const { comment, rating } = req.body;

  if (!comment && !rating) {
    throw new ApiError(
      400,
      "At least a comment or a rating is required to update feedback"
    );
  }

  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) throw new ApiError(404, "Feedback not found");

  const { user } = await getUserAndType(req);
  if (!user || String(feedback.user) !== String(user._id)) {
    throw new ApiError(403, "You are not authorized to update this feedback");
  }

  feedback.comment = comment || feedback.comment;
  feedback.rating = rating || feedback.rating;
  await feedback.save();

  return res
    .status(200)
    .json(new ApiResponse(200, feedback, "Feedback updated successfully"));
});

const deleteFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;


  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) throw new ApiError(404, "Feedback not found");

  const { user } = await getUserAndType(req);
  if (!user || String(feedback.user) !== String(user._id)) {
    throw new ApiError(403, "You are not authorized to delete this feedback");
  }

  user.feedbacks = user.feedbacks.filter((_id) => String(_id) !== feedbackId);
  await user.save();

  await Feedback.findByIdAndDelete(feedbackId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Feedback deleted successfully"));
});

const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate({
      path: "user",
      select: "email phone fullname companyName"
    }).populate("userType")

    return res
      .status(200)
      .json(new ApiResponse(200, feedbacks, "All feedbacks in the system"))
  } catch (error) {
    throw new ApiError(500, `Failed to get feedbacks: ${error.message}`)
  }
})

export { createFeedback, updateFeedback, deleteFeedback, getAllFeedback };
