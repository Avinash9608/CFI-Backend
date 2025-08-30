// routes/socialPosts.js
const express = require("express");
const router = express.Router();
const socialPostController = require("../controllers/socialhub.controller");

// Get all posts
router.get("/", socialPostController.getAllPosts);

// Get posts by platform
router.get("/platform/:platform", socialPostController.getPostsByPlatform);

// Get single post
router.get("/:id", socialPostController.getPostById);

// Create new post
router.post("/", socialPostController.createPost);

// Update post
router.put("/:id", socialPostController.updatePost);

// Delete post
router.delete("/:id", socialPostController.deletePost);

module.exports = router;
