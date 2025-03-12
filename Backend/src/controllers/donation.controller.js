import { Donation } from "../models/donation.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Consumer } from "../models/consumer.models.js";
import { Producer } from "../models/producer.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";

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
  if (req.upcycledIndustry)
    return {
      donor: await UpcyclingIndustry.findById(req.upcycledIndustry._id),
      donorType: "UpcyclingIndustry",
    };
  return { donor: null, donorType: null };
};

const createDonation = asyncHandler(async (req, res) => {
  let image;
  try {
    const { donor, donorType } = await getDonorAndType(req);
    let { items, pickupLocation } = req.body;
    console.log(req.body);
console.log(req.files);
console.log(req.file);


    // Parse items if it's a string
    if (typeof items === "string") {
      items = JSON.parse(items);
    }
    console.log("kya")
    if (!Array.isArray(items)) {
      throw new ApiError(400, "Invalid items format, expected an array.");
    }

    const processedItems = await Promise.all(
      items.map(async (item) => {
        if (item.image) {
          image = { url: item.image };
        } else if (req.file?.path) {
          try {
            image = await uploadOnCloudinary(req.file.path);
          } catch (error) {
            throw new ApiError(500, `Failed to upload item image: ${error.message}`);
          }
        } else {
          throw new ApiError(400, "Image is required for each item");
        }

        return {
          name: item.name,
          quantity: item.quantity,
          image: image.url, 
        };
      })
    );

    const totalCredits = await Donation.aggregate([
      { $match: { donor: donor._id } },
      { $group: { _id: null, totalCredits: { $sum: "$credit" } } },
    ]);

    const previousCredit = totalCredits.length
      ? totalCredits[0].totalCredits
      : 0;
    const newCredit = previousCredit + processedItems.length * 2;

    const donation = await Donation.create({
      donor: donor._id,
      donorType,
      items: processedItems,
      pickupLocation,
      newCredit,
    });

    if (!donation) {
      throw new ApiError(500, "Failed to create donation");
    }

    const createdDonation = await Donation.findById(donation._id).populate({
      path: "donor",
      select: "email phone location fullname donationsMade",
    });

    donor.donationsMade.push(donation._id);
    await donor.save();

    return res
      .status(201)
      .json(new ApiResponse(201, createdDonation, "Thanks for being part of our campaign"));

  } catch (error) {
    if (image?.public_id) {
      await deleteFromCloudinary(image.public_id);
    }
    throw new ApiError(500, `Failed to create donation: ${error.message}`);
  }
});

const getAllDonations = asyncHandler(async (req, res) => {
  try {
    const { donor, donorType } = await getDonorAndType(req);
    if (!donor || !donorType) {
      throw new ApiError(400, "Donor not found");
    }

    const donations = await Donation.find({ donor: donor._id })
      .populate({
        path: "donor",
        select: "email phone fullname",
      })
      .select("-pickupLocation");
    return res.status(200).json(new ApiResponse(200, donations, "All donations of the Donor"));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

const getDonationById = asyncHandler(async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate("donor");
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    return res.status(200).json(donation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

const getUniversalDonations = asyncHandler(async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate({
        path: "donor",
        select: "email phone fullname",
      })
      .select("-pickupLocation"); 

    return res
      .status(200)
      .json(new ApiResponse(200, donations, "All donations in the system"));
  } catch (error) {
    throw new ApiError(500, "Failed to get donations")
  }
});


export {
  createDonation,
  getAllDonations,
  getDonationById,
  getUniversalDonations,
};
