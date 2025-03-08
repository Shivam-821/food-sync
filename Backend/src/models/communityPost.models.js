import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const communityPostSchema = new Schema(
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
      enum: ["Consumer", "Producer", "UpcyclingIndustry"],
      required: true,
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
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

blogSchema.plugin(mongooseAggregatePaginate);

export const CommunityPost = mongoose.model(
  "CommunityPost",
  communityPostSchema
);
