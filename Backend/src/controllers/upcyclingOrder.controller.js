import Razorpay from "razorpay";
import crypto from "crypto";
import { UpcyclingOrder } from "../models/upcyclingOrder.models.js";
import { Cart } from "../models/cart.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Gamification } from "../models/gamification.models.js";
import { getBadge } from "../utils/gamificationUtils.js";
import {UpcyclingItem} from "../models/upcyclingItem.models.js"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeUpcyclingOrderFromCart = asyncHandler(async (req, res) => {
  try {
    const { deliveryAddress, deliveryLocation, paymentMethod } = req.body;
    console.log("deliverylocation: ", deliveryLocation)
    if (!deliveryAddress || !deliveryLocation || !paymentMethod) {
      throw new ApiError(400, "All fields are required");
    }

    const upcyclingIndustry = await UpcyclingIndustry.findById(
      req.upcycledIndustry._id
    );
    if (!upcyclingIndustry) {
      throw new ApiError(404, "Upcycling Industry not found");
    }

    const cart = await Cart.findOne({
      buyer: upcyclingIndustry._id,
      buyerType: "UpcyclingIndustry",
    }).populate("items.item")

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }
    
        let gamification = await Gamification.findOne({
          user: upcyclingIndustry._id,
        });
        const newCredit = parseFloat(Math.floor(parseFloat(cart.totalAmount) / 100))

        let discountPoint = 0
    
        if (gamification) {
          discountPoint = parseFloat(gamification.points)
          gamification.points += newCredit;
          gamification.badges = getBadge(gamification.points);
          await gamification.save();
        } else {
          gamification = await Gamification.create({
            user: upcyclingIndustry._id,
            userType: "UpcyclingIndustry",
            contribution: "Order",
            points: newCredit,
            badges: getBadge(newCredit),
          });
        }
    
        upcyclingIndustry.gamification = gamification._id;
        await upcyclingIndustry.save();

    let totalAmount = parseFloat((parseFloat(cart.totalAmount) -(discountPoint * 2.5)).toFixed(2))
    if(totalAmount < 0){
      totalAmount = 1
    }

    const upcyclingorder = new UpcyclingOrder({
      upcyclingIndustry: upcyclingIndustry._id,
      items: cart.items,
      totalAmount: totalAmount,
      deliveryAddress,
      deliveryLocation,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "unpaid",
      status: "pending",
    });

    await upcyclingorder.save();

    if (paymentMethod === "razorpay") {

      if (!razorpay) {
        throw new ApiError(500, "Razorpay is not configured");
      }

      const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${upcyclingorder._id}`,
        payment_capture: 1,
      };
      let razorpayOrder
      try {
              // Create a Razorpay order
              razorpayOrder = await razorpay.orders.create(options);
              // Update the order with the Razorpay order ID
              upcyclingorder.razorpayOrderId = razorpayOrder.id;
              await upcyclingorder.save();
            } catch (error) {
              console.error("Razorpay API Error:", error);
          
              // Handle specific Razorpay API errors
              if (error.error && error.error.description) {
                throw new ApiError(500, `Razorpay API Error: ${error.error.description}`);
              } else {
                throw new ApiError(500, "Failed to create Razorpay order");
              }
            }
      // Delete the cart after the order is created
      await Cart.deleteOne({ buyer: upcyclingIndustry._id, buyerType: "UpcyclingIndustry" });

      return res.status(201).json(
        new ApiResponse(
          201,
          {
            orderId: upcyclingorder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: totalAmount,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID,
          },
          "Upcycling order placed successfully. Proceed with payment."
        )
      );
    } else {

    upcyclingIndustry.upcyclingOrders.push(upcyclingorder._id);
    await upcyclingIndustry.save();

    await Cart.deleteOne({
      buyer: upcyclingIndustry._id,
      buyerType: "UpcyclingIndustry",
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          upcyclingorder,
          "Upcycling order placed successfully"
        )
      );
    }
  } catch (error) {
    console.error("Error placing upcycling order:", error.message);
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

const verifyUpcyclingPayment = asyncHandler(async (req, res) => {
  
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
console.log("1")
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json(new ApiError(400, "Missing payment details"));
    }
  try {
    console.log("2")
    const upcyclingorder = await UpcyclingOrder.findOne({
      razorpayOrderId: razorpay_order_id,
    });
    console.log(razorpay_order_id)
    console.log(upcyclingorder)
    if (!upcyclingorder) {
      return res
        .status(404)
        .json(new ApiError(404, "Upcycling order not found"));
    }
    console.log("4")
    // Check if the order is already paid
    if (upcyclingorder.paymentStatus === "paid") {
      return res.status(400).json(new ApiError(400, "Payment already verified"));
    }
    console.log("5")
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
      console.log("6")
    if (generated_signature !== razorpay_signature) {
      console.error("Invalid payment signature:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        generatedSignature,
      });
      return res
        .status(400)
        .json(new ApiError(400, "Payment verification failed"));
    }
    console.log("7")
    upcyclingorder.paymentStatus = "paid";
    upcyclingorder.razorpayPaymentId = razorpay_payment_id;
    await upcyclingorder.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          upcyclingorder,
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

const markOrderAsCompleted = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("Order ID from params:", orderId);
    const order = await UpcyclingOrder.findById(orderId);
    console.log(order)
    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found"));
    }
    if (order.status !== "pending" && order.status !== "Processing") {
      return res
        .status(400)
        .json(new ApiError(400, "Order cannot be completed"));
    }
console.log(order.status)
    order.status = "confirmed";
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
    const order = await UpcyclingOrder.findById(orderId).populate("items.item");
    if (!order) throw new Error("Order not found");

    for (const cartItem of order.items) {
  
  const item = await UpcyclingItem.findById(cartItem.item._id);
  if (!item) continue;

  item.quantity -= cartItem.quantity;
  item.status = item.quantity > 0 ? "available" : "Out of Stock";
  await item.save();
}

  } catch (error) {
    console.error("Error updating inventory:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const getUpcyclingOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const upcyclingOrder =
      await UpcyclingOrder.findById(orderId).populate("items.item");

    if (!upcyclingOrder) {
      throw new ApiError(404, "Upcycling order not found");
    }

    return res.status(200).json(new ApiResponse(200, upcyclingOrder));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

export {
  placeUpcyclingOrderFromCart,
  verifyUpcyclingPayment,
  getUpcyclingOrder,
  markOrderAsCompleted,
};
