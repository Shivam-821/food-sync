import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    steps: {
      type: String
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
  },
  { timestamps: true }
);


export const Recipe = mongoose.model("Recipe", recipeSchema);
