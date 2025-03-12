import { UpcyclingItem } from "../models/upcyclingItem.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Producer } from "../models/producer.models.js";
import chalk from "chalk"


const getUpcyclingItem = asyncHandler(async (req, res) => {
  const { upitemId } = req.params; 

  const upcyclingitem =
    await UpcyclingItem.findById(upitemId).populate("item producer");

  if (!upcyclingitem) {
    throw new ApiError(404, "Upcycling Item not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        upcyclingitem,
        "Upcycling Item retrieved successfully"
      )
    );
});


const getUpcyclingItems = asyncHandler(async (req, res) => {

  const upcyclingItems = await UpcyclingItem.find().populate("item").populate({
    path: "producer",
    select: "companyName fullname phone email"
  })

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        upcyclingItems,
        "Upcycling Items retrieved successfully"
      )
    );
});

const createUpcyclingItem = asyncHandler(async (req, res) => {
  const {name, method, price, quantity, unit} = req.body;

  const producer = await Producer.findById(req.producer._id)
  if(!producer){
    throw new ApiError(404, "Producer not found")
  }

  if ( !name || !method || !price || !quantity || !unit) {
    console.log(chalk.red("In createUpcyclingItem: All fields are required"))
    throw new ApiError(400, "All fields are required");
  }

  try {
    const newUpcyclingItem = await UpcyclingItem.create({ 
      name,
      method, 
      producer: producer._id,
      price, 
      quantity,
      unit,
    });

    producer.expiredItems.push(newUpcyclingItem._id);
    await producer.save()

    return res
      .status(201)
      .json( new ApiResponse(201, newUpcyclingItem,"Upcycling Item created successfully"));

  } catch (error) {
    throw new ApiError(500, `Error during Creation of Upcycling Item: ${error}`)
  }
});


const updateUpcyclingItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const producer = await Producer.findById(req.producer._id)
  if(!producer){
    throw new ApiError(404, "Producer not found")
  }
  const { method, price, quantity } = req.body;

  const upcyclingitem = await UpcyclingItem.findById(id);
  if (!upcyclingitem) {
    throw new ApiError(404, "Upcycling Item not found");
  }

  upcyclingitem.method = method || upcyclingitem.method;
  upcyclingitem.price = price || upcyclingitem.price
  upcyclingitem.quantity = quantity || upcyclingitem.quantity
  await upcyclingitem.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, upcyclingitem, "Upcycling Item updated successfully")
    );
});

const deleteUpcyclingItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const upcyclingitem = await UpcyclingItem.findByIdAndDelete(id);
  if (!upcyclingitem) {
    throw new ApiError(404, "Upcycling Item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Upcycling Item deleted successfully"));
});

export {
  createUpcyclingItem,
  getUpcyclingItem,
  getUpcyclingItems,
  updateUpcyclingItem,
  deleteUpcyclingItem,
};
