import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const donationSchema = new Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      refPath: "donorType",
      required: true,
    },
    donorType: {
      type: String,
      enum: ["Consumer", "Producer", "UpcyclingIndustry"],
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in-transit", "delivered", "canceled"],
      default: "pending",
    },
    pickupLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    deliveryLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    donationTime: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
