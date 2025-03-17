import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    consumer: {
      type: Schema.Types.ObjectId,
      ref: "buyer",
      required: true,
    },
    buyer: {
      type: String,
      enum: ["Consumer", "Ngo"]
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        producer:{
          type: Schema.Types.ObjectId,
          ref: "Producer"
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
    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "unpaid"],
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

// Pre-save hook to auto-calculate totalAmount
orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  next();
});

orderSchema.methods.updateLocation = async function(lng, lat) {
  this.location = {
      type: 'Point',
      coordinates: [lng, lat]
  };
  await this.save();
}

// Create 2dsphere index for geospatial queries
orderSchema.index({ location: '2dsphere' });

// Function to start periodic location updates
function startLocationUpdates(captain, updateInterval = 10000) {
  if (navigator.geolocation) {
      const intervalId = setInterval(async () => {
          navigator.geolocation.getCurrentPosition(async (position) => {
              await captain.updateLocation(
                  position.coords.longitude,
                  position.coords.latitude
              );
          });
      }, updateInterval);

      return intervalId;
  }
  return null;
}

export const Order = mongoose.model("Order", orderSchema);
