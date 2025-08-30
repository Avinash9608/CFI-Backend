const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");

// GET /api/news - Get all news items
router.get("/", newsController.getAllNews);

// GET /api/news/:id - Get single news item
router.get("/:id", newsController.getNewsById);

// POST /api/news - Create new news item
router.post("/", newsController.createNews);

// PUT /api/news/:id - Update news item
router.put("/:id", newsController.updateNews);

// DELETE /api/news/:id - Delete news item
router.delete("/:id", newsController.deleteNews);

// GET /api/news/category/:category - Get news by category
router.get("/category/:category", newsController.getNewsByCategory);

module.exports = router;
