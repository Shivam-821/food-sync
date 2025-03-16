import mongoose, { Schema } from "mongoose";

const upcyclingOrderSchema = new Schema(
  {
    upcyclingIndustry: {
      type: Schema.Types.ObjectId,
      ref: "UpcyclingIndustry",
      required: true,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "UpcyclingItem",
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
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid","unpaid", "failed"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
      default: null,
    },
    paymentReference: {
      type: String,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryLocation: {
      type: {
          type: String,
          enum: ['Point'],
          required: true
      },
      coordinates: {
          type: [Number],
          required: true
      }
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

upcyclingOrderSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  next();
});

export const UpcyclingOrder = mongoose.model(
  "UpcyclingOrder",
  upcyclingOrderSchema
);
