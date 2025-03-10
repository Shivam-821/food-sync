import { UpcyclingOrder } from "../models/upcyclingOrder.model.js";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const placeUpcyclingOrderFromCart = asyncHandler( async (req, res) => {
  try {
    const { upcyclingIndustryId, deliveryAddress, deliveryLocation } = req.body;

    const cart = await Cart.findOne({ 
      buyer: upcyclingIndustryId,
      buyerType: "UpcyclingIndustry",
    });

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is Empty")
    }

    const upcyclingOrder = new UpcyclingOrder({
      upcyclingIndustry: upcyclingIndustryId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      deliveryAddress,
      deliveryLocation,
    });

    await upcyclingOrder.save();

    await Cart.deleteOne({
      buyer: upcyclingIndustryId,
      buyerType: "UpcyclingIndustry",
    });

    res
      .status(201)
      .json(201, upcyclingOrder, "Order Placed Successfully");
  } catch (error) {
    throw new ApiError(500, "Internal server Error")
  }
});


const getUpcyclingOrder = asyncHandler( async (req, res) => {
  try {
    const { orderId } = req.params;

    const upcyclingOrder =
      await UpcyclingOrder.findById(orderId).populate("items.item");

    if (!upcyclingOrder)
      throw new ApiError(404, "Order not found")

    return res
      .status(200)
      .json(200, upcyclingOrder);
  } catch (error) {
     throw new ApiError(500, "Intenal server Error")
  }
});


const updateUpcyclingOrderStatus = asyncHandler( async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, paymentStatus } = req.body;

    const upcyclingOrder = await UpcyclingOrder.findById(orderId);

    if (!upcyclingOrder)
      throw new ApiError(404, "Order not found")

    if (status) upcyclingOrder.status = status;
    if (paymentStatus) upcyclingOrder.paymentStatus = paymentStatus;

    await upcyclingOrder.save();

    res
      .status(200)
      .json(new ApiResponse(200, upcyclingOrder, "Order updated succesfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server Error")
  }
});


export {placeUpcyclingOrderFromCart, updateUpcyclingOrderStatus, getUpcyclingOrder}