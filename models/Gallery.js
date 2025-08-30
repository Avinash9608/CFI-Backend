const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["nature", "portrait", "architecture", "travel", "food", "other"],
      default: "other",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    metadata: {
      width: Number,
      height: Number,
      format: String,
      size: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
gallerySchema.index({ category: 1, isFeatured: 1 });
gallerySchema.index({ tags: 1 });

module.exports = mongoose.model("Gallery", gallerySchema);
