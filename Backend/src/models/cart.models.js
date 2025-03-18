import mongoose, {Schema} from "mongoose"

const cartSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      refPath: "buyerType",
      required: true,
    },
    buyerType: {
      type: String,
      enum: ["Consumer", "UpcyclingIndustry", "Ngo"],
      required: true,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          refPath: "items.itemType",
          required: true,
        },
        itemType: {
          type: String,
          enum: ["Item", "UpcyclingItem"],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        producer: {
          type: Schema.Types.ObjectId,
          ref: "Producer",
        },
      },
    ],
    totalAmount: { type: Number, default: 1 },
    finalAmount: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);