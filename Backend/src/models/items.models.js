import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["kg", "liters", "pieces", "packets"],
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["perishable", "non-perishable", "ready-to-eat"],
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "donated", "expired", "upcycled"],
      default: "available",
    },
    upcyclingOptions: {
      type: [String],
      enum: ["biogas", "compost", "fertilizer", "cosmetics"],
    },
    inWishlist: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

blogSchema.plugin(mongooseAggregatePaginate);

export const Item = mongoose.model("Item", itemSchema);
