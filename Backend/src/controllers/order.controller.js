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

const getBuyerAndType = async (req) => {
  if (req.consumer) {
    return {
      buyer: await Consumer.findById(req.consumer._id),
      buyerId: req.consumer._id,
      buyerType: "Consumer",
    };
  }
  if (req.ngo) {
    return {
      buyer: await Ngo.findById(req.ngo._id),
      buyerId: req.ngo._id,
      buyerType: "Ngo",
    };
  }
  return { buyer: null, buyerId: null, buyerType: null };
};

const placeOrderFromCart = asyncHandler(async (req, res) => {
  try {
    const { location, address, paymentMethod } = req.body;
    const {buyer, buyerId, buyerType} = await getBuyerAndType(req)

    if(!buyer || !buyerId || !buyerType){
      return res.status(404)
      .json(new ApiResponse(404, "buyer not found"))
    }

    if (!address || !paymentMethod) {
      throw new ApiError(400, "All fields are required");
    }
    
    const cart = await Cart.findOne({
      buyer: buyerId,
      buyerType: buyerType,
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

    let gamification = await Gamification.findOne({ user: buyerId });
    const newCredit =  parseFloat(extraPoints);
    console.log('newCredit: ', newCredit)

    if (gamification) {
      if(gamification.discountPoints > cart.totalAmount){
        gamification.discountPoints -= cart.totalAmount
      } else{
        gamification.discountPoints = 0
      }
      gamification.points += newCredit;
      gamification.discountPoints += newCredit
      console.log("gamification: ", gamification.discountPoints)
      gamification.badges = getBadge(gamification.points);
      await gamification.save();
    } else {
      gamification = await Gamification.create({
        user: buyerId,
        userType: buyerType,
        contribution: "Order",
        points: newCredit,
        discountPoints: newCredit,
        badges: getBadge(newCredit),
      });
    }

    buyer.gamification = gamification._id;
    await buyer.save();
    console.log('finalAmount: ', cart.finalAmount)
    let totalAmount = parseFloat((parseFloat(cart.finalAmount)).toFixed(2));
    console.log('totalA: ', totalAmount )

    const order = new Order({
      consumer: buyerId,
      items: cart.items,
      buyer: buyerType,
      totalAmount: totalAmount,
      deliveryAddress: address,
      deliveryLocation: location,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "unpaid",
      status: "Pending",
    });

    await order.save();

    if (paymentMethod === "razorpay") {
      if (!razorpay) {
        throw new ApiError(500, "Razorpay is not configured");
      }

      const options = {
        amount: totalAmount * 100, // in paise
        currency: "INR",
        receipt: `receipt_${order._id}`,
        payment_capture: 1, // auto-capture
      };
      console.log("total: ", totalAmount)
     
      let razorpayOrder;
      try {
        razorpayOrder = await razorpay.orders.create(options);

        order.razorpayOrderId = razorpayOrder.id;
        await order.save();
      } catch (error) {
        await Order.deleteOne({ _id: order._id });
        console.error("Razorpay API Error:", error);
    
        if (error.error && error.error.description) {
          throw new ApiError(500, `Razorpay API Error: ${error.error.description}`);
        } else {
          throw new ApiError(500, "Failed to create Razorpay order");
        }
      }
    
      await Cart.deleteOne({ buyer: buyerId, buyerType: buyerType });
    
      return res.status(201).json(
        new ApiResponse(
          201,
          {
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: totalAmount,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID || "razorpay_key_id_missing", // Fallback for missing key
          },
          "Order placed successfully. Proceed with payment."
        )
      );
    } else {

    // For Cash on Delivery (COD)
    buyer.orders.push(order._id);
    await buyer.save();
    await Cart.deleteOne({ buyer: buyerId, buyerType: buyerType });
    
    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully"));
  }
  } catch (err) {
    console.error("Error placing order:", err.message);
    return res
      .status(500)
      .json(new ApiError(500, err.message || "Internal Server Error"));
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  // Validate input
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json(new ApiError(400, "Missing required payment details"));
  }
 
  try {
    // Find the order by razorpay_order_id
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found"));
    }

    // Check if the order is already paid
    if (order.paymentStatus === "paid") {
      return res.status(400).json(new ApiError(400, "Payment already verified"));
    }

    // Generate the expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify the signature
    if (generatedSignature !== razorpay_signature) {
      console.error("Invalid payment signature:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        generatedSignature,
      });
      return res.status(400).json(new ApiError(400, "Invalid payment signature"));
    }

    // Update the order status to "Paid"
    order.paymentStatus = "paid";
    await order.save();

    res
      .status(200)
      .json(new ApiResponse(200, order, "Payment verified successfully"));
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json(new ApiError(500, error.message || "Internal Server Error"));
  }
});

const markOrderAsCompleted = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("Order ID from params:", orderId);
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found"));
    }

    if (order.status !== "Pending" && order.status !== "Processing") {
      return res
        .status(400)
        .json(new ApiError(400, "Order cannot be completed"));
    }

    order.status = "Confirmed";
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
      item.status = item.quantity > 0 ? "available" : "Out of Stock";
      await item.save();
    }
  } catch (error) {
    console.error("Error updating inventory:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
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