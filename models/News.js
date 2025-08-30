const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: [
        "development",
        "healthcare",
        "education",
        "agriculture",
        "environment",
        "community",
      ],
      default: "community",
    },
    author: {
      type: String,
      default: "Village Administration",
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
newsSchema.index({ createdAt: -1 });
newsSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model("News", newsSchema);
