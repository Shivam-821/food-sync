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
  return { buyer: null, buyerId: null, buyerType: null };
};

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { buyer, buyerId, buyerType } = await getBuyerAndType(req);
    const { itemId, quantity, price, addOne, deleteOne } = req.query;

    if (!buyerId || !buyerType || !itemId || !quantity || !price) {
      console.log(chalk.red("Addto cart: Missing required fields"));
      throw new ApiError(400, "missing required fields");
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
    if (existingItem){
      if (addOne === "add") {
       existingItem.quantity = existingItem.quantity + 1;
      }else if(deleteOne === "delete"){
        existingItem.quantity = existingItem.quantity - 1
      }
      await cart.save()

      return res.status(200).json(new ApiResponse(200, cart, "Item quantity updated successfully"))
    }

    if (existingItem) {
      existingItem.quantity += parsedQuantity;
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
      message: "Item added to cart successfully",
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

    // Validate buyer, buyerId, and buyerType
    if (!buyer || !buyerId || !buyerType) {
      throw new ApiError(404, "Buyer not found");
    }

    // Validate buyerType
    if (buyerType !== "Consumer" && buyerType !== "UpcyclingIndustry") {
      throw new ApiError(400, "Invalid buyer type");
    }

    // Define populate options based on buyerType
    let populateOptions = {
      path: "items.item",
      select: "name producer avatar",
    };

    if (buyerType === "Consumer") {
      populateOptions.model = "Item";
    } else if (buyerType === "UpcyclingIndustry") {
      populateOptions.model = "UpcyclingItem";
    }

    // Fetch the cart and populate the necessary fields
    const cart = await Cart.findOne({ buyer: buyerId, buyerType })
      .populate(populateOptions)
      .populate({
        path: "items.producer",
        select: "location email phone fullname producerType companyName",
      });

    // Check if cart exists
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }

    // Return the cart details
    res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
  } catch (error) {
    console.error(`Error During getCart: ${error}`);

    // Handle specific errors
    if (error instanceof ApiError) {
      throw error; // Re-throw custom errors
    } else {
      throw new ApiError(500, error?.message || "Internal server error");
    }
  }
});

export { getCart, addToCart, removeItemFromCart };
