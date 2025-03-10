import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const upcyclingSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    method: {
      type: String,
      enum: ["biogas", "compost", "fertilizer", "cosmetics"],
      required: true,
    },
    processedBy: {
      type: Schema.Types.ObjectId,
      ref: "UpcyclingIndustry",
      required: true,
    },
    consumer: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

upcyclingSchema.plugin(mongooseAggregatePaginate);

export const Upcycling = mongoose.model("Upcycling", upcyclingSchema);
