import Razorpay from "razorpay";
import crypto from "crypto";
import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.models.js";
import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrderFromCart = asyncHandler(async (req, res) => {
  try {
    const { location, address, paymentMethod } = req.body;

    if (!location || !address || !paymentMethod) {
      throw new ApiError(400, "All fields are required")
    }

    const consumer = await Consumer.findById(req.consumer.id);
    if (!consumer) {
      return res.status(404).json(new ApiError(404, "Consumer not found"));
    }

    const consumerId = consumer._id;

    const cart = await Cart.findOne({
      buyer: consumerId,
      buyerType: "Consumer",
    });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json(new ApiError(404, "Cart is Empty"));
    }

    const order = new Order({
      consumer: consumerId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      deliveryAddress: address,
      deliveryLocation: location,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "unpaid",
      status: "Pending",
    });

    await order.save();

    if (paymentMethod === "Online") {
      const options = {
        amount: cart.totalAmount * 100, 
        currency: "INR",
        receipt: `receipt_${order._id}`,
        payment_capture: 1, 
      };

      const razorpayOrder = await razorpay.orders.create(options);

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      return res.status(201).json(
        new ApiResponse(
          201,
          {
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: cart.totalAmount,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID, 
          },
          "Order placed successfully. Proceed with payment."
        )
      );
    }

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
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json(new ApiError(400, "Missing payment details"));
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res
        .status(400)
        .json(new ApiError(400, "Payment verification failed"));
    }

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found"));
    }

    order.paymentStatus = "Paid";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { razorpay_payment_id },
          "Payment verified successfully"
        )
      );
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Internal Server Error"));
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

export { placeOrderFromCart, getOrder, verifyPayment };
