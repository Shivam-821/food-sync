import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const upcyclingIndustrySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[6-9]\d{9}$/.test(value.toString());
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: String,
    },
    address:{
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
    cart:{
      type: Schema.Types.ObjectId,
      ref: "Cart",
    }, 
    partnerships: [
      {
        type: Schema.Types.ObjectId,
        ref: "Partnership",
      },
    ],
    upcyclingOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: "UpcyclingOrder",
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
      phone: this.phone
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
