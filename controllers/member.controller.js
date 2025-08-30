// controllers/memberController.js
const Member = require("../models/Members");

// Get all active members
exports.getAllMembers = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
      ];
    }

    const members = await Member.find(filter).sort({
      isSarpanch: -1,
      order: 1,
      createdAt: -1,
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single member
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new member
exports.createMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      image,
      isSarpanch,
      phone,
      email,
      social,
      order,
    } = req.body;

    const newMember = new Member({
      name,
      designation,
      image,
      isSarpanch: isSarpanch || false,
      phone,
      email,
      social: social || {},
      order: order || 0,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update member
exports.updateMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      image,
      isSarpanch,
      phone,
      email,
      social,
      order,
    } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { name, designation, image, isSarpanch, phone, email, social, order },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle member status
exports.toggleMemberStatus = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.isActive = !member.isActive;
    await member.save();

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
