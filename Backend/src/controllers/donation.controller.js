import { Donation } from "../models/donation.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getDonorAndType = async (req) => {
  if (req.consumer)
    return {
      donor: await Consumer.findById(req.consumer._id),
      donorType: "Consumer",
    };
  if (req.producer)
    return {
      donor: await Producer.findById(req.producer._id),
      donorType: "Producer",
    };
  if (req.upcyclingIndustry)
    return {
      donor: await UpcyclingIndustry.findById(req.upcyclingIndustry._id),
      donorType: "UpcyclingIndustry",
    };
  return { donor: null, donorType: null };
};

const createDonation = asyncHandler(async (req, res) => {
  try {
    const { donor, donorType } = await getDonorAndType(req);
    const { items, pickupLocation } = req.body;

    if (!donor || !donorType || !items || !items.length) {
      throw new ApiError(400, "Donor and items are required");
    }

    const processedItems = await Promise.all(
      items.map(async (item) => {
        if (!item.image && !req.file?.path) {
          throw new ApiError(400, "Each item requires an image");
        }

        const uploadedImage = item.image
          ? { url: item.image }
          : await uploadOnCloudinary(req.file.path);

        return {
          name: item.name,
          quantity: item.quantity,
          image: uploadedImage.url,
        };
      })
    );

    const credit = processedItems.length * 5;

    const donation = await Donation.create({
      donor: donor._id,
      donorType,
      items: processedItems,
      pickupLocation,
      credit,
    });

    if (!donation) {
      throw new ApiError(500, "Failed to create donation");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, donation, "Thanks for being part of our campaign")
      );
  } catch (error) {
    throw new ApiError(500, `Failed to create donation: ${error.message}`);
  }
});


const getAllDonations = asyncHandler( async (req, res) => {
  try {
    const {donor, donorType } = await getDonorAndType(req)
    if(!donor || !donorType){
        throw new ApiError(400, "Donor not found")
    }

    const donations = await Donation.find().populate("donor");
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


const getDonationById = asyncHandler( async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate("donor");
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    return res.status(200).json(donation);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


const updateDonationStatus = asyncHandler( async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "in-transit", "delivered", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!donation) return res.status(404).json({ message: "Donation not found" });

    return res.status(200).json({ message: "Status updated", donation });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



export {createDonation, getAllDonations, updateDonationStatus, getDonationById}