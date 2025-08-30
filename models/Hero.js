const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    paragraph: { type: String, required: true },
    buttons: [
      {
        text: { type: String, required: true },
        link: { type: String, default: "#" },
        bgColor: { type: String, default: "var(--primary-color)" },
        textColor: { type: String, default: "#ffffff" },
      },
    ],
    backgroundImage: { type: String },
    textColor: { type: String, default: "#ffffff" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
