import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      refPath: "authorType",
      required: true,
    },
    authorType: {
      type: String,
      enum: ["FoodSync", "Consumer", "Producer", "UpcyclingIndustry"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    tags: [String],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Consumer",
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          refPath: "comments.userType",
        },
        userType: {
          type: String,
          enum: ["Consumer", "Producer", "UpcyclingIndustry"],
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    featuredImage: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

blogSchema.plugin(mongooseAggregatePaginate);

export const Blog = mongoose.model("Blog", blogSchema);
