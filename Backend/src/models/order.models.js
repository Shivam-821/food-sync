import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    consumer: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        producer: {
          type: Schema.Types.ObjectId,
          ref: "Producer",
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
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
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
  },
  { timestamps: true }
);

// Pre-save hook to auto-calculate totalAmount
orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  next();
});

export const Order = mongoose.model("Order", orderSchema);
