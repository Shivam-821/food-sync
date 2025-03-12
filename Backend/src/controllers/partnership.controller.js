import { Partnership } from "../models/partner.models.js";
import { Producer } from "../models/producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPartnership = asyncHandler(async (req, res) => {
  const { organization, type, partners } = req.body;

  if (!organization || !type || !partners || partners.length === 0) {
    throw new ApiError(400, "Organization, type, and partners are required");
  }

  // Check if the producer exists and is authorized to create a partnership
  const producer = await Producer.findById(req.producer._id);
  if (!producer) {
    throw new ApiError(404, "Producer not found");
  }

  try {
    const partnership = await Partnership.create({
      organization,
      type,
      partners,
    });

    producer.partnerships.push(partnership._id);
    await producer.save();

    return res
      .status(201)
      .json(
        new ApiResponse(201, partnership, "Partnership created successfully")
      );
  } catch (error) {
    throw new ApiError(500, `Failed to create partnership: ${error.message}`);
  }
});


const getAllPartnerships = asyncHandler(async (req, res) => {
  const partnerships = await Partnership.find().populate("partners");

  if (!partnerships || partnerships.length === 0) {
    throw new ApiError(404, "No partnerships found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, partnerships, "Partnerships fetched successfully")
    );
});


const getPartnershipById = asyncHandler(async (req, res) => {
  const { partnershipId } = req.params;

  const partnership =
    await Partnership.findById(partnershipId).populate("partners");
  if (!partnership) {
    throw new ApiError(404, "Partnership not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, partnership, "Partnership fetched successfully")
    );
});

// Update a partnership
const updatePartnership = asyncHandler(async (req, res) => {
  const { partnershipId } = req.params;
  const updateFields = req.body;

  const partnership = await Partnership.findById(partnershipId);
  if (!partnership) {
    throw new ApiError(404, "Partnership not found");
  }

  const producer = await Producer.findById(req.producer._id);
  if (!partnership.partners.includes(producer._id)) {
    throw new ApiError(
      403,
      "You are not authorized to update this partnership"
    );
  }

  const updatedPartnership = await Partnership.findByIdAndUpdate(
    partnershipId,
    updateFields,
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPartnership,
        "Partnership updated successfully"
      )
    );
});

// Delete a partnership
const deletePartnership = asyncHandler(async (req, res) => {
  const { partnershipId } = req.params;

  const partnership = await Partnership.findById(partnershipId);
  if (!partnership) {
    throw new ApiError(404, "Partnership not found");
  }

  const producer = await Producer.findById(req.producer._id);
  if (!partnership.partners.includes(producer._id)) {
    throw new ApiError(
      403,
      "You are not authorized to delete this partnership"
    );
  }

  producer.partnerships = producer.partnerships.filter(
    (id) => id.toString() !== partnershipId.toString()
  );
  await producer.save();

  await Partnership.findByIdAndDelete(partnershipId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Partnership deleted successfully"));
});

export {
  createPartnership,
  getAllPartnerships,
  getPartnershipById,
  updatePartnership,
  deletePartnership,
};
