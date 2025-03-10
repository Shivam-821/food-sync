import { Cart } from "../models/cart.models.js";
import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Producer } from "../models/producer.models.js";
import { Item } from "../models/items.models.js";


const getBuyerAndType = async (req) => {
  if (req.consumer)
    return {
      buyer: await Consumer.findById(req.consumer._id),
      buyerId: req.consumer._id,
      buyerType: "Consumer",
    };
  if (req.upcyclingIndustry)
    return {
      buyer: await UpcyclingIndustry.findById(req.upcyclingIndustry._id),
      buyerId: req.upcyclingIndustry._id,
      buyerType: "UpcyclingIndustry",
    };
  return { buyer: null, buyerId: null, buyerType: null };
};

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { buyer, buyerId, buyerType } = await getBuyerAndType(req);
    const { itemId, quantity, price } = req.query;

    if (!buyerId || !buyerType || !itemId || !quantity || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure quantity and price are valid numbers
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

    // Fetch the item details to get the producer
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const producer = await Producer.findById(item.producer);
    if (!producer) {
      return res.status(404).json({ error: "Producer not found" });
    }

    // Fetch the buyer's cart
    let cart = await Cart.findOne({ buyer: buyerId, buyerType });

    if (!cart) {
      cart = new Cart({ buyer: buyerId, buyerType, items: [] });
      await cart.save();
    }

    // Link the cart to the buyer if not already linked
    if (!buyer.cart) {
      buyer.cart = cart._id;
      await buyer.save();
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) => item.item.equals(itemId));

    if (existingItem) {
      existingItem.quantity += parsedQuantity;
    } else {
      cart.items.push({
        item: itemId,
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
    const {buyer, buyerId, buyerType} = await getBuyerAndType(req);
    const {itemId} = req.query; 

    if (!buyer, !buyerId || !buyerType || !itemId) {
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
    const {buyer, buyerId, buyerType} = await getBuyerAndType(req)

    if(!buyer || !buyerId || !buyerType){
      throw new ApiError(404, "Buyer not found")
    }

    const cart = await Cart.findOne({ buyer: buyerId, buyerType })
      .populate({
        path: "items.item",
        select: "name producer"
      })
      .populate("items.quantity")
      .populate("items.price")

    if (!cart) {
      throw new ApiError(404, "cart not found")
    }

    res.status(200).json(new ApiResponse(200, cart));
  } catch (error) {
    console.error(`Error During getCart: ${error}`)
    throw new ApiError(500, "Internal server error")
  }
});

export { getCart, addToCart, removeItemFromCart };
