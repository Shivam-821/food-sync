import mongoose, {Schema} from "mongoose";

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      refPath: "userType",
      required: true,
    },
    userType: {
      type: String,
      enum: ["Consumer", "Producer", "UpcyclingIndustry"],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String },
  },
  { timestamps: true }
);
export const Feedback = mongoose.model("Feedback", feedbackSchema);
