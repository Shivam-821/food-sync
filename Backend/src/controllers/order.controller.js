import { Order } from "../models/order.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { consumer, producer, items, deliveryAddress, deliveryLocation } =
    req.body;

  if (
    !consumer ||
    !producer ||
    !items?.length ||
    !deliveryAddress ||
    !deliveryLocation
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await Order.create({
    consumer,
    producer,
    items,
    deliveryAddress,
    deliveryLocation,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

// Get all orders for a consumer
const getConsumerOrders = asyncHandler(async (req, res) => {
  const { consumerId } = req.params;

  const orders = await Order.find({ consumer: consumerId })
    .populate("producer")
    .populate("items.item");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Consumer orders fetched successfully"));
});

// Get all orders for a producer
const getProducerOrders = asyncHandler(async (req, res) => {
  const { producerId } = req.params;

  const orders = await Order.find({ producer: producerId })
    .populate("consumer")
    .populate("items.item");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Producer orders fetched successfully"));
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

export { createOrder, getConsumerOrders, getProducerOrders, updateOrderStatus };
