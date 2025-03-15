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
import { Gamification } from "../models/gamification.models.js";

const getBadge = (points) => {
  if (points >= 151) return "Legend";
  if (points >= 101) return "Champion";
  if (points >= 61) return "Achiever";
  if (points >= 21) return "Contributor";
  return "Rookie";
};

const getDonorAndType = async (req) => {
  if (req.consumer){
    console.log(req.consumer)
    return {
      donor: await Consumer.findById(req.consumer._id),
      donorType: "Consumer",
    };
  }if (req.producer){
    console.log(req.producer)
    return {
      donor: await Producer.findById(req.producer._id),
      donorType: "Producer",
    };
  }if (req.upcycledIndustry){
    console.log(req.upcycledIndustry)
    return {
      donor: await UpcyclingIndustry.findById(req.upcycledIndustry._id),
      donorType: "UpcyclingIndustry",
    };
  }
  return { donor: null, donorType: null };
};

const createDonation = asyncHandler(async (req, res) => {
  let uploadedImages = [];

  try {
    const { donor, donorType } = await getDonorAndType(req);
    console.log("donor: ", donor)
    if (!donor) throw new ApiError(400, "Donor not found");

    const { pickupLocation } = req.body;
    const items = req.body.items; 

    if (!items) throw new ApiError(400, "Items are required");

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage = await uploadOnCloudinary(file.path);
        if (uploadedImage) {
          uploadedImages.push(uploadedImage.url);
        }
      }
    }

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    const processedItems = items.map((item, index) => ({
      name: item.name,
      quantity: item.quantity,
      image:
        uploadedImages[index] ||
        "https://www.example.com/default-food-image.jpg",
    }));

    const donation = await Donation.create({
      donor: donor._id,
      donorType,
      items: processedItems,
      pickupLocation,
      credit: processedItems.length * 2,
    });

    if (!donation) throw new ApiError(500, "Failed to create donation");

    let gamification = await Gamification.findOne({ user: donor._id });
    const newCredit = Number(((processedItems.length * totalQuantity)/12).toFixed(2))

    if (gamification) {
      gamification.points += newCredit;
      gamification.badges = getBadge(gamification.points);
      await gamification.save();
    } else {
      gamification = await Gamification.create({
        user: donor._id,
        userType: donorType,
        points: newCredit,
        contribution: "donation",
        badges: getBadge(newCredit),
      });
    }

    donor.gamification = gamification._id;
    await donor.save()

    donor.donationsMade.push(donation._id);
    await donor.save();

    let createdDonation
    if(donorType === "UpcyclingIndustry"){
       createdDonation = await Donation.findById(donation._id).populate({
        path: "donor",
        select: "email phone location companyName",
      });
    }
    else{
      createdDonation = await Donation.findById(donation._id).populate({
        path: "donor",
        select: "email phone location fullname",
      });
    }
     

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { createdDonation, gamification },
          "Thanks for being part of our campaign"
        )
      );
  } catch (error) {
    for (const image of uploadedImages) {
      if (image.public_id) await deleteFromCloudinary(image.public_id);
    }
    throw new ApiError(500, `Failed to create donation: ${error.message}`);
  }
});

const getAllDonations = asyncHandler(async (req, res) => {
  try {
    const { donor, donorType } = await getDonorAndType(req);
    if (!donor || !donorType) throw new ApiError(400, "Donor not found");

    const donations = await Donation.find({ donor: donor._id })
      .populate({ path: "donor", select: "email phone fullname companyName" })
      .select("-pickupLocation");

    return res
      .status(200)
      .json(new ApiResponse(200, donations, "All donations of the Donor"));
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
      .populate({ path: "donor", select: "email phone fullname companyName" })
      .select("-pickupLocation");

    return res
      .status(200)
      .json(new ApiResponse(200, donations, "All donations in the system"));
  } catch (error) {
    throw new ApiError(500, "Failed to get donations");
  }
});

export {
  createDonation,
  getAllDonations,
  getDonationById,
  getUniversalDonations,
};
