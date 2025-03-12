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
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    pickupLocation: {
      type: String
    },
    credit:{
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
