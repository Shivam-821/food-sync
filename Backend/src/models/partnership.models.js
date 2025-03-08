import mongoose, {Schema} from "mongoose"

const partnershipSchema = new Schema(
  {
    organization: { type: String, required: true },
    type: {
      type: String,
      enum: ["NGO", "Government", "Corporate", "UpcyclingIndustry"],
      required: true,
    },
    partners: [{ type: Schema.Types.ObjectId, ref: "Producer" }],
  },
  { timestamps: true }
);
export const Partnership = mongoose.model("Partnership", partnershipSchema);
