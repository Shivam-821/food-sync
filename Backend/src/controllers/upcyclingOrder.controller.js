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
    });
    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }
    
        let gamification = await Gamification.findOne({
          user: upcyclingIndustry._id,
        });
        const newCredit = Math.floor(Number(cart.totalAmount) / 100)

        let discountPoint = 0
    
        if (gamification) {
          discountPoint = gamification.points
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

    const totalAmount = Number(cart.totalAmount) - parseFloat((discountPoint * 2.5).toFixed(2))
    if(totalAmount < 0){
      totalAmount = 0
    }

    const upcyclingOrder = new UpcyclingOrder({
      upcyclingIndustry: upcyclingIndustry._id,
      items: cart.items,
      totalAmount: totalAmount,
      deliveryAddress,
      deliveryLocation,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "unpaid",
      status: "pending",
    });

    await upcyclingOrder.save();

    if (paymentMethod === "Online") {
      const options = {
        amount: cart.totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${upcyclingOrder._id}`,
        payment_capture: 1,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      upcyclingOrder.razorpayOrderId = razorpayOrder.id;
      await upcyclingOrder.save();


      return res.status(201).json(
        new ApiResponse(
          201,
          {
            orderId: upcyclingOrder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: cart.totalAmount,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID,
          },
          "Upcycling order placed successfully. Proceed with payment."
        )
      );
    }

    upcyclingIndustry.upcyclingOrders.push(upcyclingOrder._id);
    await upcyclingIndustry.save();

    upcyclingOrder.status = "confirmed"
    await upcyclingOrder.save()

    await Cart.deleteOne({
      buyer: upcyclingIndustry._id,
      buyerType: "UpcyclingIndustry",
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          upcyclingOrder,
          "Upcycling order placed successfully"
        )
      );
  } catch (error) {
    console.error("Error placing upcycling order:", error.message);
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

const verifyUpcyclingPayment = asyncHandler(async (req, res) => {
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

    const upcyclingOrder = await UpcyclingOrder.findOne({
      razorpayOrderId: razorpay_order_id,
    });
    if (!upcyclingOrder) {
      return res
        .status(404)
        .json(new ApiError(404, "Upcycling order not found"));
    }

    upcyclingOrder.paymentStatus = "Paid";
    upcyclingOrder.razorpayPaymentId = razorpay_payment_id;
    await upcyclingOrder.save();

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
};
