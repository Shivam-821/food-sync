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
      enum: ["Consumer", "Producer", "UpcyclingIndustry", "Ngo"],
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    discountPoints: {
      type: Number,
      default: 0,
    },
    badges: {
      type: String,
      enum: ["Rookie", "Contributor", "Achiever", "Champion", "Legend"],
    },
    contribution: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Gamification = mongoose.model("Gamification", gamificationSchema);
