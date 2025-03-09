import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const consumerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: { type: String },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: { type: String },
    consumerType: {
      type: String,
      enum: ["ngo", "individual"],
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    donationsReceived: [
      {
        type: Schema.Types.ObjectId,
        ref: "Donation",
        default: []
      },
    ],
    donationsMade: [
      {
        type: Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
    gamification: {
      type: Schema.Types.ObjectId,
      ref: "Gamification",
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    communityPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "CommunityPost",
      },
    ],
  },
  { timestamps: true }
);

consumerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

consumerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

consumerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

consumerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET,
    { expiresIn: process.env.REFERESH_TOKEN_EXPIRY }
  );
};

export const Consumer = mongoose.model("Consumer", consumerSchema);
