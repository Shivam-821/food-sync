import mongoose, {Schema} from "mongoose"

const gamificationSchema = new Schema(
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
    points: {
      type: Number,
      default: 0,
    },
    badges: [String],
  },
  { timestamps: true }
);
export const Gamification = mongoose.model("Gamification", gamificationSchema);
