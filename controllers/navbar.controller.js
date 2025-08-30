const { NavbarItem, NavbarConfig } = require("../models/Navbar");

// Get all navbar items
exports.getNavbarItems = async (req, res) => {
  try {
    const navbarItems = await NavbarItem.find({ isActive: true }).sort({
      order: 1,
    });
    res.status(200).json(navbarItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all navbar items (for admin)
exports.getAllNavbarItems = async (req, res) => {
  try {
    const navbarItems = await NavbarItem.find().sort({ order: 1 });
    res.status(200).json(navbarItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a navbar item
exports.createNavbarItem = async (req, res) => {
  const navbarItem = new NavbarItem({
    title: req.body.title,
    path: req.body.path,
    order: req.body.order,
    isActive: req.body.isActive,
  });

  try {
    const newNavbarItem = await navbarItem.save();
    res.status(201).json(newNavbarItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a navbar item
exports.updateNavbarItem = async (req, res) => {
  try {
    const updatedNavbarItem = await NavbarItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNavbarItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a navbar item
exports.deleteNavbarItem = async (req, res) => {
  try {
    await NavbarItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Navbar item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get navbar configuration
exports.getNavbarConfig = async (req, res) => {
  try {
    let config = await NavbarConfig.findOne();
    if (!config) {
      // Create default config if none exists
      config = await NavbarConfig.create({});
    }
    res.status(200).json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update navbar configuration
exports.updateNavbarConfig = async (req, res) => {
  try {
    let config = await NavbarConfig.findOne();
    if (!config) {
      config = await NavbarConfig.create(req.body);
    } else {
      config = await NavbarConfig.findOneAndUpdate({}, req.body, { new: true });
    }
    res.status(200).json(config);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
