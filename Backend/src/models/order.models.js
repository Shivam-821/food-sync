import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new Schema(
  {
    consumer: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
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
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
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
orderSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  next();
});

// Add aggregation pagination plugin
orderSchema.plugin(mongooseAggregatePaginate);

export const Order = mongoose.model("Order", orderSchema);
