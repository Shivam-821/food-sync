import { Cart } from "../models/cart.models.js";
import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Producer } from "../models/producer.models.js";
import { Item } from "../models/items.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { UpcyclingItem } from "../models/upcyclingItem.models.js";
import chalk from "chalk";
import { Gamification } from "../models/gamification.models.js";
import { Ngo } from "../models/ngo.models.js";

const getBuyerAndType = async (req) => {
  if (req.consumer) {
    return {
      buyer: await Consumer.findById(req.consumer._id),
      buyerId: req.consumer._id,
      buyerType: "Consumer",
    };
  }
  if (req.upcycledIndustry) {
    return {
      buyer: await UpcyclingIndustry.findById(req.upcycledIndustry._id),
      buyerId: req.upcycledIndustry._id,
      buyerType: "UpcyclingIndustry",
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

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { buyer, buyerId, buyerType } = await getBuyerAndType(req);
    console.log("BuyerType: ", buyerType);
    const { itemId, quantity, price, addOne, deleteOne } = req.query;

    if (!buyerId || !buyerType || !itemId || !quantity || !price) {
      console.log(chalk.red("Add to cart: Missing required fields"));
      throw new ApiError(400, "Missing required fields");
    }

    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);

    if (
      isNaN(parsedQuantity) ||
      isNaN(parsedPrice) ||
      parsedQuantity <= 0 ||
      parsedPrice <= 0
    ) {
      return res.status(400).json({ error: "Invalid quantity or price" });
    }

    let item, itemType;
    if (buyerType === "Consumer") {
      item = await Item.findById(itemId);
      itemType = "Item";
    } else if (buyerType === "UpcyclingIndustry") {
      item = await UpcyclingItem.findById(itemId);
      itemType = "UpcyclingItem";
    } else if (buyerType === "Ngo") {
      item = await Item.findById(itemId);
      itemType = "Item";
    }

    if (!item) {
      throw new ApiError(404, "Item not found");
    }

    const producer = await Producer.findById(item.producer);
    if (!producer) {
      return res.status(404).json({ error: "Producer not found" });
    }

    let cart = await Cart.findOne({ buyer: buyerId, buyerType });

    if (!cart) {
      cart = new Cart({ buyer: buyerId, buyerType, items: [] });
      await cart.save();
    }

    if (!buyer.cart) {
      buyer.cart = cart._id;
      await buyer.save();
    }

    const existingItem = cart.items.find((cartItem) =>
      cartItem.item.equals(itemId)
    );

    if (existingItem) {
      if (addOne === "add") {
        existingItem.quantity += 1;
      } else if (deleteOne === "delete") {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          // Remove the item if quantity becomes 0 or negative
          cart.items = cart.items.filter(
            (cartItem) => !cartItem.item.equals(itemId)
          );
        }
      } else {
        existingItem.quantity += parsedQuantity;
      }
    } else {
      cart.items.push({
        item: itemId,
        itemType,
        quantity: parsedQuantity,
        price: parsedPrice,
        producer: producer._id,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: existingItem
        ? "Item quantity updated successfully"
        : "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  try {
    const { buyer, buyerId, buyerType } = await getBuyerAndType(req);
    const { itemId } = req.query;

    if (!buyer || !buyerId || !buyerType || !itemId) {
      throw new ApiError(400, "Missing required fields");
    }

    const cart = await Cart.findOne({ buyer: buyerId, buyerType });

    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.item.toString() !== itemId);

    if (cart.items.length === initialLength) {
      throw new ApiError(404, "Item not found in cart");
    }

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res
        .status(200)
        .json(
          new ApiResponse(200, {}, "Cart is now empty and has been deleted")
        );
    }
    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Item removed from cart"));
  } catch (error) {
    console.error("Error in removeItemFromCart:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
});

const getCart = asyncHandler(async (req, res) => {
  try {
    const { buyer, buyerId, buyerType } = await getBuyerAndType(req);

    if (!buyer || !buyerId || !buyerType) {
      throw new ApiError(404, "Buyer not found");
    }

    if (
      buyerType !== "Consumer" &&
      buyerType !== "UpcyclingIndustry" &&
      buyerType !== "Ngo"
    ) {
      throw new ApiError(400, "Invalid buyer type");
    }

    let populateOptions = {
      path: "items.item",
      select: "name producer avatar",
    };

    if (buyerType === "Consumer") {
      populateOptions.model = "Item";
    } else if (buyerType === "UpcyclingIndustry") {
      populateOptions.model = "UpcyclingItem";
    } else if (buyerType === "Ngo") {
      populateOptions.model = "Item";
    }

    const cart = await Cart.findOne({ buyer: buyerId, buyerType })
      .populate(populateOptions)
      .populate({
        path: "items.producer",
        select: "location email phone fullname producerType companyName",
      });

    if (!cart) {
      return res
        .status(200)
        .json(new ApiResponse(200, { items: [] }, "Cart is empty"));
    }

    const gamification = await Gamification.findOne({ user: buyerId });

    let discountValue = 0;
    if (gamification) {
      console.log("disPoint", gamification.discountPoints);
      discountValue = parseFloat(gamification.discountPoints);
      await gamification.save();
    } else {
      discountValue = 0;
    }

    let finalValue = parseFloat(
      (parseFloat(cart.totalAmount) - discountValue * 2).toFixed(2)
    );
    console.log("finalValue: ", finalValue);

    if (finalValue < 1) {
      finalValue = 1;
    }
    cart.finalAmount = finalValue;
    await cart.save();
    console.log("final: ", cart.finalAmount);

    // Return the cart details
    res
      .status(200)
      .json(new ApiResponse(200, cart, "Cart fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});
export { getCart, addToCart, removeItemFromCart };
