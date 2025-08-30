// models/Member.js
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isSarpanch: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    social: {
      facebook: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one sarpanch exists
memberSchema.pre("save", async function (next) {
  if (this.isSarpanch) {
    try {
      await mongoose
        .model("Member")
        .updateMany(
          { _id: { $ne: this._id }, isSarpanch: true },
          { $set: { isSarpanch: false } }
        );
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Member", memberSchema);
