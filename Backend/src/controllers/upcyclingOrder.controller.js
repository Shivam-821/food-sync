import { UpcyclingOrder } from "../models/upcyclingOrder.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createUpcyclingOrder = asyncHandler(async (req, res) => {
  const { producer, upcyclingIndustry, items } = req.body;

  if (!producer || !upcyclingIndustry || !items?.length) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await UpcyclingOrder.create({
    producer,
    upcyclingIndustry,
    items,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Upcycling order created successfully"));
});

// Get all upcycling orders for a producer
const getProducerUpcyclingOrders = asyncHandler(async (req, res) => {
  const { producerId } = req.params;

  const orders = await UpcyclingOrder.find({ producer: producerId })
    .populate("upcyclingIndustry")
    .populate("items.item");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders,
        "Producer upcycling orders fetched successfully"
      )
    );
});

// Get all upcycling orders for an upcycling industry
const getUpcyclingIndustryOrders = asyncHandler(async (req, res) => {
  const { upcyclingIndustryId } = req.params;

  const orders = await UpcyclingOrder.find({
    upcyclingIndustry: upcyclingIndustryId,
  })
    .populate("producer")
    .populate("items.item");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders,
        "Upcycling industry orders fetched successfully"
      )
    );
});

// Update upcycling order status
const updateUpcyclingOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await UpcyclingOrder.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Upcycling order not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, order, "Upcycling order status updated successfully")
    );
});

export {
  createUpcyclingOrder,
  getProducerUpcyclingOrders,
  getUpcyclingIndustryOrders,
  updateUpcyclingOrderStatus,
};
