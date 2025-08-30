const mongoose = require("mongoose");

const navbarItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
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

const navbarConfigSchema = new mongoose.Schema(
  {
    logoLight: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvLDXSOzrGD7xytQ8X4RKclxexFtdJV9EViA&s",
    },
    logoDark: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvLDXSOzrGD7xytQ8X4RKclxexFtdJV9EViA&s",
    },
    headerTitle: {
      type: String,
      default: "Gram Panchayat",
    },
  },
  {
    timestamps: true,
  }
);

const NavbarItem = mongoose.model("NavbarItem", navbarItemSchema);
const NavbarConfig = mongoose.model("NavbarConfig", navbarConfigSchema);

module.exports = { NavbarItem, NavbarConfig };
