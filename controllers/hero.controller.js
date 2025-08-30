const Hero = require("../models/Hero");

// Get Hero content
const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 }); // latest hero content
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add Hero content
const addHero = async (req, res) => {
  try {
    const { heading, paragraph, buttons, backgroundImage, textColor } =
      req.body;
    const newHero = new Hero({
      heading,
      paragraph,
      buttons,
      backgroundImage,
      textColor,
    });
    await newHero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Hero content
const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHero = await Hero.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedHero);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Hero content
const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    await Hero.findByIdAndDelete(id);
    res.json({ message: "Hero content deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getHero, addHero, updateHero, deleteHero };
