const {
  FooterSection,
  SocialMedia,
  FooterConfig,
} = require("../models/Footer");

// Get all footer data for frontend
exports.getFooterData = async (req, res) => {
  try {
    const sections = await FooterSection.find({ isActive: true }).sort({
      order: 1,
    });
    const socialMedia = await SocialMedia.find({ isActive: true });
    const config =
      (await FooterConfig.findOne()) || (await FooterConfig.create({}));

    res.status(200).json({
      sections,
      socialMedia,
      config,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all footer data for admin
exports.getAllFooterData = async (req, res) => {
  try {
    const sections = await FooterSection.find().sort({ order: 1 });
    const socialMedia = await SocialMedia.find();
    const config =
      (await FooterConfig.findOne()) || (await FooterConfig.create({}));

    res.status(200).json({
      sections,
      socialMedia,
      config,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Footer Section CRUD operations
exports.createFooterSection = async (req, res) => {
  try {
    const newSection = await FooterSection.create(req.body);
    res.status(201).json(newSection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateFooterSection = async (req, res) => {
  try {
    const updatedSection = await FooterSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFooterSection = async (req, res) => {
  try {
    await FooterSection.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer section deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Social Media CRUD operations
exports.createSocialMedia = async (req, res) => {
  try {
    const newSocialMedia = await SocialMedia.create(req.body);
    res.status(201).json(newSocialMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSocialMedia = async (req, res) => {
  try {
    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSocialMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSocialMedia = async (req, res) => {
  try {
    await SocialMedia.findByIdAndDelete(req.params.id);
    res.json({ message: "Social media link deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update footer configuration
exports.updateFooterConfig = async (req, res) => {
  try {
    let config = await FooterConfig.findOne();
    if (!config) {
      config = await FooterConfig.create(req.body);
    } else {
      config = await FooterConfig.findOneAndUpdate({}, req.body, { new: true });
    }
    res.status(200).json(config);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Handle newsletter subscription
exports.subscribeNewsletter = async (req, res) => {
  try {
    // In a real application, you would save this to a database
    // For now, we'll just return a success message
    console.log("Newsletter subscription:", req.body.email);
    res
      .status(200)
      .json({ message: "Thank you for subscribing to our newsletter!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
