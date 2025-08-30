const News = require("../models/News");

// Get all news items
exports.getAllNews = async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;

    let query = { status: "published" };

    if (category && category !== "all") {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await News.countDocuments(query);

    res.json({
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single news item by ID
exports.getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "News item not found" });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new news item
exports.createNews = async (req, res) => {
  try {
    const newsItem = new News(req.body);
    const savedNews = await newsItem.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update news item
exports.updateNews = async (req, res) => {
  try {
    const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newsItem) {
      return res.status(404).json({ message: "News item not found" });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete news item
exports.deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "News item not found" });
    }
    res.json({ message: "News item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get news by category
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await News.find({
      category,
      status: "published",
    }).sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
