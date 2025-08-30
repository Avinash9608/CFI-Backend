const mongoose = require("mongoose");

const footerSectionSchema = new mongoose.Schema(
  {
    sectionType: {
      type: String,
      required: true,
      enum: ["brand", "quickLinks", "contact", "newsletter"],
    },
    title: String,
    content: mongoose.Schema.Types.Mixed, // Can be string or array of objects
    order: {
      type: Number,
      default: 0,
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

const socialMediaSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const footerConfigSchema = new mongoose.Schema(
  {
    copyrightText: {
      type: String,
      default: "© 2024 Village Panchayat™. All Rights Reserved.",
    },
    showSocialMedia: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FooterSection = mongoose.model("FooterSection", footerSectionSchema);
const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
const FooterConfig = mongoose.model("FooterConfig", footerConfigSchema);

module.exports = { FooterSection, SocialMedia, FooterConfig };
