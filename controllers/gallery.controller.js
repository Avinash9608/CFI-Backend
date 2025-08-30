const Gallery = require("../models/Gallery");

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 50 } = req.query;

    // Convert page and limit to numbers safely
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;

    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }

    const images = await Gallery.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const total = await Gallery.countDocuments(query);

    res.status(200).json({
      success: true,
      images,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new image
exports.createImage = async (req, res) => {
  try {
    const image = new Gallery(req.body);
    const savedImage = await image.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update image
exports.updateImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk update image order
exports.updateImageOrder = async (req, res) => {
  try {
    const { images } = req.body;
    const bulkOps = images.map((image, index) => ({
      updateOne: {
        filter: { _id: image._id },
        update: { $set: { order: index } },
      },
    }));

    await Gallery.bulkWrite(bulkOps);
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
