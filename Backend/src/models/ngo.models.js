import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ngoSchema = new Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    ngoName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: Number,
      // required: true,
      // unique: true,
      validate: {
        validator: function (value) {
          return /^[6-9]\d{9}$/.test(value.toString());
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    role: {
      type: String,
      required: true,
    },
    avatar: { type: String },
    password: {
      type: String,
      // required: [true, "password is required"],
    },
    refreshToken: { type: String },
    address: {
      type: String,
      required: true,
    },
    donationsMade: [
      {
        type: String,
        ref: "Donation",
      },
    ],
    requestMade: {
      type: Boolean,
      default: false,
    },
    donationsReceived: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Donation"
        }
    ],
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order"
      }
    ],
    cart:{
      type: Schema.Types.ObjectId,
      ref: "Cart"
    },
    gamification: {
      type: Schema.Types.ObjectId,
      ref: "Gamification",
    },
  },
  { timestamps: true }
);

ngoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ngoSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

ngoSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

ngoSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET,
    { expiresIn: process.env.REFERESH_TOKEN_EXPIRY }
  );
};

export const Ngo = mongoose.model("Ngo", ngoSchema);
