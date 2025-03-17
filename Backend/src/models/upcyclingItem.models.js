import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Producer } from "./producer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const upcyclingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
      required: true,
    },
    method: {
      type: String,
      enum: {
        values: ["biogas", "compost", "fertilizer", "cosmetics"],
        message: "{VALUE} is not a valid upcycling option",
      },
    },
    quantity: {
      type: Number,
      min: [1, "Quantity must be at least 1"],
      required: [true, "Quantity is required"],
    },
    avatar: {
      type: String,
    },
    unit: {
      type: String,
      enum: {
        values: ["kg", "liters", "pieces", "packets"],
        message: "{VALUE} is not a valid unit",
      },
      required: [true, "Unit is required"],
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      required: true,
    },
  },
  { timestamps: true }
);

upcyclingSchema.plugin(mongooseAggregatePaginate);

upcyclingSchema.statics.addExpiredItemsToUpcycling = async function () {
  try {
    const Item = mongoose.model("Item");
    const UpcyclingItem = mongoose.model("UpcyclingItem");
    const Producer = mongoose.model("Producer");

    // Find expired items
    const expiredItems = await Item.find({
      expiryDate: { $lt: new Date() },
      status: "expired",
    });


    if (expiredItems.length === 0) return;

    const upcyclingEntries = expiredItems.map((expiredItem) => ({
      item: expiredItem._id,
      name: expiredItem.name,
      method: expiredItem.upcyclingOptions || "compost",
      avatar: expiredItem.avatar || "",
      price: parseFloat((expiredItem.price * 0.6).toFixed(2)),
      quantity: expiredItem.quantity,
      unit: expiredItem.unit,
      producer: expiredItem.producer,
    }));
    
    let insertedUpcyclingItems;
    try {
      insertedUpcyclingItems = await UpcyclingItem.insertMany(
        upcyclingEntries,
        { ordered: false }
      );
      console.log(
        `Inserted ${insertedUpcyclingItems.length} items into UpcyclingItem collection.`
      );
    } catch (error) {
      console.error("Error inserting upcycling items:", error);
      throw error; 
    }

    const producerUpdates = {};
    insertedUpcyclingItems.forEach((upcyclingItem, index) => {
      const producerId = expiredItems[index].producer;
      if (!producerUpdates[producerId]) {
        producerUpdates[producerId] = [];
      }
      producerUpdates[producerId].push(upcyclingItem._id);
    });

    const updatePromises = Object.entries(producerUpdates).map(
      async ([producerId, upcyclingItemIds]) => {
        await Producer.findByIdAndUpdate(producerId, {
          $push: { expiredItems: { $each: upcyclingItemIds } },
        });
      }
    );
    await Promise.all(updatePromises);

    const expiredItemIds = expiredItems.map((item) => item._id);
    await Item.deleteMany({ _id: { $in: expiredItemIds } });

    console.log(
      `Added ${expiredItems.length} expired items to Upcycling and updated Producers.`
    );
  } catch (error) {
    console.error("Error adding expired items to Upcycling:", error);
    throw error; 
  }
};



export const UpcyclingItem = mongoose.model("UpcyclingItem", upcyclingSchema);
