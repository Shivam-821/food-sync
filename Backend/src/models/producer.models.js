import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const producerSchema = new Schema(
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
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    donationsMade: [
      {
        type: Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    producerType: {
      type: String,
      enum: ["factory", "supermarket", "hotel", "restaurant", "farmer"],
      required: true,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
    partnerships: [
      {
        type: Schema.Types.ObjectId,
        ref: "Partnership",
      },
    ],
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
    },
    upcyclingTransactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upcycling",
      },
    ],
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

producerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

producerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

producerSchema.methods.generateAccessToken = function () {
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

producerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET,
    { expiresIn: process.env.REFERESH_TOKEN_EXPIRY }
  );
};

export const Producer = mongoose.model("Producer", producerSchema);
