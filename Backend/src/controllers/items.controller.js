import { Item } from "../models/items.models.js";
import { Producer } from "../models/producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const createItem = asyncHandler(async (req, res) => {
  const {
    name,
    quantity,
    unit,
    price,
    category,
    mfDate,
    typeitem,
    expiryDate,
    upcyclingOptions,
    avatar: avatarUrl,
    description,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !quantity ||
    !unit ||
    !price ||
    !category ||
    !mfDate ||
    !expiryDate ||
    !description
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const producer = await Producer.findById(req.producer._id);
  if (!producer) {
    throw new ApiError(404, "Producer not found");
  }

  let avatar;
  const avatarLocalPath = req.file?.path;
  if (avatarLocalPath) {
    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
    } catch (error) {
      throw new ApiError(500, `Failed to upload item image: ${error.message}`);
    }
  } else if (avatarUrl) {
    avatar = { url: avatarUrl };
  } else {
    throw new ApiError(404, "Avatar is required");
  }

  // item creation
  try {
    const item = await Item.create({
      name,
      producer: producer._id,
      quantity,
      unit,
      price,
      typeitem,
      avatar: avatar?.url || "",
      category,
      mfDate,
      expiryDate,
      description,
      upcyclingOptions: upcyclingOptions || "compost",
    });

    // Add the item to the producer's items list
    producer.items.push(item._id);
    await producer.save();

    const itemDetail = await Item.findOne({ _id: item._id }).populate({
      path: "producer",
      select: "location email phone fullname producerType companyName",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, itemDetail, "Item created successfully"));
  } catch (error) {
    if (avatar?.public_id) await deleteFromCloudinary(avatar.public_id);
    throw new ApiError(500, `Failed to create item: ${error.message}`);
  }
});

// Get a single item by ID

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ expiryDate: 1 }).populate({
    path: "producer",
    select: "fullname email phone companyName location",
  });

  if (!items) {
    throw new ApiError(404, "Items not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, items, "Items fetched successfully"));
});

const getItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await Item.findById(itemId).populate({
    path: "producer",
    select: "location email phone fullname producerType companyName",
  });
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, item, "Item fetched successfully"));
});

// Update an item
const updateItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const updateFields = req.body;

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  // Check if the producer owns the item
  if (!req.producer || String(item.producer) !== String(req.producer._id)) {
    throw new ApiError(403, "You are not authorized to update this item");
  }

  // Validate manufacturing and expiry date if provided
  if (updateFields.mfDate && updateFields.expiryDate) {
    const mfDate = new Date(updateFields.mfDate);
    const expiryDate = new Date(updateFields.expiryDate);
    if (mfDate >= expiryDate) {
      throw new ApiError(
        400,
        "Expiry date must be after the manufacturing date"
      );
    }
  }

  // Handle avatar update (Delete old one and upload new one)
  if (req.file) {
    if (item.avatar) {
      await deleteFromCloudinary(item.avatar.public_id); // Delete old image
    }
    const newAvatar = await uploadOnCloudinary(req.file.path);
    updateFields.avatar = newAvatar.url;
  }

  // Update the item
  const updatedItem = await Item.findByIdAndUpdate(itemId, updateFields, {
    new: true,
  }).populate({
    path: "producer",
    select: "location email phone fullname producerType companyName",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedItem, "Item updated successfully"));
});

// Delete an item
const deleteItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  // Ensure producer is available
  if (!req.producer || String(item.producer) !== String(req.producer._id)) {
    throw new ApiError(403, "You are not authorized to delete this item");
  }

  // Delete item image from Cloudinary if exists
  if (item.avatar) {
    const avatarPublicId = item.avatar.split("/").pop().split(".")[0]; // Extract public ID
    await deleteFromCloudinary(avatarPublicId);
  }

  // Remove the item from the producer's list
  const producer = await Producer.findById(req.producer._id);
  if (producer) {
    producer.items = producer.items.filter(
      (id) => id.toString() !== itemId.toString()
    );
    await producer.save();
  }

  // Delete the item from the database
  await Item.findByIdAndDelete(itemId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Item deleted successfully"));
});

export { createItem, getAllItems, getItemById, updateItem, deleteItem };
