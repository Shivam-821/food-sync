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
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
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
    credit:{
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
