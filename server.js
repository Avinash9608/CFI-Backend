const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://cfi-frontend.vercel.app",
      "https://cfi-admin-panel.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// DB connection
connectDB();

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CFI Backend API" });
});

// Routes
app.use("/api/hero", require("./routes/hero.routes"));
app.use("/api/gallery", require("./routes/gallery.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/social-posts", require("./routes/socialhub.routes"));
app.use("/api/contact-messages", require("./routes/contact.routes"));
app.use("/api/members", require("./routes/member.routes"));
app.use("/api/navbar", require("./routes/navbar.routes"));
app.use("/api/footer", require("./routes/footer.routes"));
// Error Handler (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
