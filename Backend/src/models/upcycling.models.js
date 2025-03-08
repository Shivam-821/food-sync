import mongoose, {Schema} from "mongoose";

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
    },
    consumer: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
    },
  },
  { timestamps: true }
);

blogSchema.plugin(mongooseAggregatePaginate);

export const Upcycling = mongoose.model("Upcycling", upcyclingSchema);
