// controllers/socialPostController.js
const SocialPost = require("../models/Socialhub");

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await SocialPost.find({ isActive: true }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts by platform
exports.getPostsByPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const posts = await SocialPost.find({
      platform:
        platform === "all"
          ? { $in: ["facebook", "twitter", "instagram"] }
          : platform,
      isActive: true,
    }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post
exports.getPostById = async (req, res) => {
  try {
    const post = await SocialPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { platform, title, content, imageUrl, date } = req.body;

    const newPost = new SocialPost({
      platform,
      title,
      content,
      imageUrl,
      date: date || new Date(),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { platform, title, content, imageUrl, date, isActive } = req.body;

    const updatedPost = await SocialPost.findByIdAndUpdate(
      req.params.id,
      { platform, title, content, imageUrl, date, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await SocialPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
