// models/SocialPost.js
const mongoose = require("mongoose");

const socialPostSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ["facebook", "twitter", "instagram", "all"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SocialPost", socialPostSchema);
