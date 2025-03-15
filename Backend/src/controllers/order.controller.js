import {asyncHandler} from "../utils/asyncHandler.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import {Order} from "../models/order.models.js";
import {Cart} from "../models/cart.models.js";
import {Consumer} from "../models/consumer.models.js";
import {Producer} from "../models/producer.models.js";
import {Gamification} from "../models/gamification.models.js";
import { getBadge } from "../utils/gamificationUtils.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {Item } from "../models/items.models.js"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrderFromCart = asyncHandler(async (req, res) => {
  try {
    const { location, address, paymentMethod } = req.body;

    // Validate input data
    if (!address || !paymentMethod) {
      throw new ApiError(400, "All fields are required");
    }

    const consumer = await Consumer.findById(req.consumer.id);
    if (!consumer) {
      return res.status(404).json(new ApiError(404, "Consumer not found"));
    }

    const consumerId = consumer._id;
    const cart = await Cart.findOne({
      buyer: consumerId,
      buyerType: "Consumer",
    }).populate("items.item");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json(new ApiError(404, "Cart is Empty"));
    }

    let extraPoints = 0;
    const today = new Date();

    for (let cartItem of cart.items) {
      const item = cartItem.item;
      if (!item.expiryDate) continue;

      const expiryDate = new Date(item.expiryDate);
      const daysToExpiry = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
      );

      let multiplier = 1;
      if (daysToExpiry <= 3) multiplier = 3;
      else if (daysToExpiry <= 7) multiplier = 2;

      extraPoints +=
        Math.floor((cartItem.price * cartItem.quantity) / 100) * multiplier;
    }

    let discountPoint = 0;

    let gamification = await Gamification.findOne({ user: consumer._id });
    const newCredit = Math.floor(cart.totalAmount / 100) + extraPoints;

    if (gamification) {
      discountPoint = gamification.points;
      gamification.points += newCredit;
      gamification.badges = getBadge(gamification.points);
      await gamification.save();
    } else {
      gamification = await Gamification.create({
        user: consumer._id,
        userType: "Consumer",
        contribution: "Order",
        points: newCredit,
        badges: getBadge(newCredit),
      });
    }

    consumer.gamification = gamification._id;
    await consumer.save();

    // Calculate total amount after applying discount
    let totalAmount = cart.totalAmount - discountPoint * 2.5;
    if (totalAmount < 0) {
      totalAmount = 0;
    }

    const order = new Order({
      consumer: consumerId,
      items: cart.items,
      totalAmount: totalAmount,
      deliveryAddress: address,
      deliveryLocation: location,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "unpaid",
      status: "Pending",
    });

    await order.save();

    if (paymentMethod === "Online") {
      // Validate Razorpay configuration
      if (!razorpay) {
        throw new ApiError(500, "Razorpay is not configured");
      }

      const options = {
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${order._id}`,
        payment_capture: 1,
      };

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create(options);
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      // Clear the cart after successful order creation
      await Cart.deleteOne({ buyer: consumerId, buyerType: "Consumer" });

      return res.status(201).json(
        new ApiResponse(
          201,
          {
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: totalAmount,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID,
          },
          "Order placed successfully. Proceed with payment."
        )
      );
    }

    // For Cash on Delivery (COD)
    consumer.orders.push(order._id);
    await consumer.save();
    await Cart.deleteOne({ buyer: consumerId, buyerType: "Consumer" });

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully"));
  } catch (error) {
    console.error("Error placing order:", error.message);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Internal Server Error"));
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
  if (!order) {
    return res.status(404).json(new ApiError(404, "Order not found"));
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json(new ApiError(400, "Invalid payment signature"));
  }

  order.paymentStatus = "Paid";
  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Payment verified successfully"));
});

const markOrderAsCompleted = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found"));
    }

    if (order.status !== "Pending" && order.status !== "Processing") {
      return res
        .status(400)
        .json(new ApiError(400, "Order cannot be completed"));
    }

    order.status = "Completed";
    await order.save();
    await updateInventoryOnOrderCompletion(orderId);

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order completed successfully"));
  } catch (error) {
    console.error("Error completing order:", error.message);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Internal Server Error"));
  }
});

const updateInventoryOnOrderCompletion = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.item");
    if (!order) throw new Error("Order not found");

    for (const cartItem of order.items) {
      const item = await Item.findById(cartItem.item._id);
      if (!item) continue;

      item.quantity -= cartItem.quantity;
      item.status = item.quantity > 0 ? "Available" : "Out of Stock";
      await item.save();
    }
  } catch (error) {
    console.error("Error updating inventory:", error.message);
  }
};


const getOrderDetails = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("consumer", "name email")
      .populate("items.item", "name price expiryDate")
      .exec();

    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order details fetched successfully"));
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Internal Server Error"));
  }
});


export {
  placeOrderFromCart,
  verifyPayment,
  markOrderAsCompleted,
  updateInventoryOnOrderCompletion,
  getOrderDetails,
}