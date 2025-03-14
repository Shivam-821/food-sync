import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const consumerSchema = new Schema(
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
    consumerType: {
      type: String,
      enum: ["ngo", "individual"],
    },
    address:{
      type: String,
    },
    location: {
      type: {
          type: String,
          enum: ['Point'],
      },
      coordinates: {
          type: [Number],
      }
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
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    gamification: {
      type: Schema.Types.ObjectId,
      ref: "Gamification",
    },
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
      phone: this.phone,
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


consumerSchema.methods.updateLocation = async function(lng, lat) {
  this.location = {
      type: 'Point',
      coordinates: [lng, lat]
  };
  await this.save();
}

// Create 2dsphere index for geospatial queries
consumerSchema.index({ location: '2dsphere' });

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

export const Consumer = mongoose.model("Consumer", consumerSchema);
