import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const upcyclingOrderSchema = new Schema(
  {
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
      required: true,
    },
    upcyclingIndustry: {
      type: Schema.Types.ObjectId,
      ref: "UpcyclingIndustry",
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
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: {
      type: Date,
    },
    feedback: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate the total amount
upcyclingOrderSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  next();
});

// Add aggregation pagination plugin
upcyclingOrderSchema.plugin(mongooseAggregatePaginate);

export const UpcyclingOrder = mongoose.model(
  "UpcyclingOrder",
  upcyclingOrderSchema
);
