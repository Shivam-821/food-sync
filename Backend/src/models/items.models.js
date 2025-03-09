import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
      required: [true, "Producer ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    unit: {
      type: String,
      enum: {
        values: ["kg", "liters", "pieces", "packets"],
        message: "{VALUE} is not a valid unit",
      },
      required: [true, "Unit is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    category: {
      type: String,
      enum: {
        values: ["perishable", "non-perishable", "ready-to-eat"],
        message: "{VALUE} is not a valid category",
      },
      required: [true, "Category is required"],
    },
    mfDate: {
      type: Date,
      required: [true, "Manufacturing date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Manufacturing date cannot be in the future",
      },
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
      validate: {
        validator: function (value) {
          return value > this.get("mfDate"); // Properly access the mfDate field
        },
        message: "Expiry date must be after the manufacturing date",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["available", "donated", "expired", "upcycled"],
        message: "{VALUE} is not a valid status",
      },
      default: "available",
    },
    upcyclingOptions: {
      type: [String],
      enum: {
        values: ["biogas", "compost", "fertilizer", "cosmetics"],
        message: "{VALUE} is not a valid upcycling option",
      },
    },
    inWishlist: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

itemSchema.plugin(mongooseAggregatePaginate);

itemSchema.statics.itemExists = async function (itemId) {
  const item = await this.findById(itemId);
  return !!item;
};

export const Item = mongoose.model("Item", itemSchema);
