import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const placeOrderFromCart = asyncHandler(async (req, res) => {
  try {
    const { consumerId, deliveryAddress, deliveryLocation } = req.body;

    const cart = await Cart.findOne({
      buyer: consumerId,
      buyerType: "Consumer",
    });

    if (!cart || cart.items.length === 0) {
      throw new ApiError(404, "Cart is Empty");
    }

    const order = new Order({
      consumer: consumerId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      deliveryAddress,
      deliveryLocation,
    });

    await order.save();

    await Cart.deleteOne({ buyer: consumerId, buyerType: "Consumer" });

    return res.status(201).json(201, order, "Ordre placed successfully");
  } catch (error) {
    throw new ApiError(500, "Internal server Error");
  }
});

const getOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.item");

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(new ApiResponse(200, order));
  } catch (error) {
    throw new ApiError(500, "Internal server Error");
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    return res.status(200).json(200, order, "Order updated successfully");
  } catch (error) {
    throw new ApiError(500, "Internal server Error");
  }
});

export { placeOrderFromCart, getOrder, updateOrderStatus };
