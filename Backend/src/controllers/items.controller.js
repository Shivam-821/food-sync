import { Item } from "../models/items.models.js";
import { Producer } from "../models/producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// Create a new item
const createItem = asyncHandler(async (req, res) => {
  const {
    name,
    quantity,
    unit,
    price,
    category,
    mfDate,
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
      avatar: avatar?.url || "",
      category,
      mfDate,
      expiryDate,
      description,
      upcyclingOptions,
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

// all items
const getAllItems = asyncHandler(async (req, res) => {
  const {
    category,
    status,
    minPrice,
    maxPrice,
    sortBy = "createdAt", 
    sortOrder = "desc", 
    page = 1,
    limit = 10,
  } = req.query;


  const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
  const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Validate pagination values
  if (isNaN(pageNum) || pageNum < 1) {
    throw new ApiError(400, "Page must be a valid number greater than 0");
  }
  if (isNaN(limitNum) || limitNum < 1) {
    throw new ApiError(400, "Limit must be a valid number greater than 0");
  }

  // Validate price range
  if (
    minPriceNum !== undefined &&
    maxPriceNum !== undefined &&
    minPriceNum > maxPriceNum
  ) {
    throw new ApiError(400, "minPrice must be less than or equal to maxPrice");
  }

  // Build the aggregation pipeline
  const matchStage = {};
  if (category) {
    matchStage.category = { $eq: category.toLowerCase() };
  }
  if (status) {
    matchStage.status = { $eq: status.toLowerCase() };
  }
  if (minPriceNum !== undefined || maxPriceNum !== undefined) {
    matchStage.price = {};
    if (minPriceNum !== undefined) matchStage.price.$gte = minPriceNum;
    if (maxPriceNum !== undefined) matchStage.price.$lte = maxPriceNum;
  }

  // Handle sorting logic
  const sortStage = {};
  const allowedSortFields = ["price", "createdAt", "category", "status"];
  if (allowedSortFields.includes(sortBy)) {
    sortStage[sortBy] = sortOrder === "desc" ? -1 : 1; 
  } else {
    sortStage["createdAt"] = -1; 
  }

  try {
    // Aggregation pipeline
   const result = await Item.aggregate([
     { $match: matchStage }, // Apply filters
     {
       $lookup: {
         from: "producers",
         localField: "producer",
         foreignField: "_id",
         as: "producerDetails",
       },
     },
     { $unwind: "$producerDetails" }, // Flatten producerDetails array
     { $sort: sortStage }, // Apply sorting
     {
       $project: {
         // Include only the fields you want in the response
         name: 1,
         category: 1,
         price: 1,
         status: 1,
         createdAt: 1,
         updatedAt: 1,
         quantity: 1,
         unit: 1,
         avatar: 1,
         description: 1,
         mfDate: 1,
         expiryDate: 1,
         upcyclingOptions: 1,
         inWishlist: 1,
         producer: {
           fullname: "$producerDetails.fullname",
           email: "$producerDetails.email",
           location: "$producerDetails.location",
           phone: "$producerDetails.phone",
           companyName: "$producerDetails.companyName",
           producerType: "$producerDetails.producerType",
         },
       },
     },
     {
       $facet: {
         metadata: [{ $count: "totalItems" }],
         data: [{ $skip: (pageNum - 1) * limitNum }, { $limit: limitNum }],
       },
     },
   ]);

    // Extract results
    const items = result[0]?.data || [];
    const totalItems = result[0]?.metadata[0]?.totalItems || 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / limitNum));

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          items,
          totalItems,
          totalPages,
          currentPage: pageNum,
          limit: limitNum,
        },
        "Items fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, "An error occurred while fetching items");
  }
});



// Get a single item by ID
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
    select: "location email phone fullname producerType companyName"
  })

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
