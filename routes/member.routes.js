// routes/members.js
const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");

// Get all members
router.get("/", memberController.getAllMembers);

// Get single member
router.get("/:id", memberController.getMemberById);

// Create new member
router.post("/", memberController.createMember);

// Update member
router.put("/:id", memberController.updateMember);

// Delete member
router.delete("/:id", memberController.deleteMember);

// Toggle member status
router.patch("/:id/status", memberController.toggleMemberStatus);

module.exports = router;
