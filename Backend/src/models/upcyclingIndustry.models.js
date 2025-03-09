import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const upcyclingIndustrySchema = new Schema(
  {
    username:{
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: String,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    upcyclingMethods: {
      type: [String],
      enum: ["biogas", "compost", "fertilizer", "cosmetics"],
      required: true,
    },
    itemsProcessed: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    refreshToken: { type: String },
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

upcyclingIndustrySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

upcyclingIndustrySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

upcyclingIndustrySchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      companyName: this.companyName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

upcyclingIndustrySchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET,
    { expiresIn: process.env.REFERESH_TOKEN_EXPIRY }
  );
};

export const UpcyclingIndustry = mongoose.model(
  "UpcyclingIndustry",
  upcyclingIndustrySchema
);
