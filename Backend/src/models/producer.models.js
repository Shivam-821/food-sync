import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const producerSchema = new Schema(
  {
    fullname: {
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
    address:{
      type: String,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
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
    upcyclingTransactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upcycling",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
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
      phone: this.phone,
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
