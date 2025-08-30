// routes/contactMessages.js
const express = require("express");
const router = express.Router();
const contactMessageController = require("../controllers/contact.controller");
const { sendReplyEmail } = require("../utils/emailService");

// Get all messages (for admin)
router.get("/", contactMessageController.getAllMessages);

// Get single message
router.get("/:id", contactMessageController.getMessageById);

// Create new message (from contact form)
router.post("/", contactMessageController.createMessage);

// Update message status (mark as read, replied, etc.)
router.put("/:id", contactMessageController.updateMessage);

// Delete message
router.delete("/:id", contactMessageController.deleteMessage);

router.post("/test-email", async (req, res) => {
  try {
    const { email } = req.body;
    const emailResult = await sendReplyEmail(
      email,
      "Test Email from Village Administration",
      "This is a test email to verify your email configuration is working correctly."
    );

    if (emailResult.success) {
      res.json({ message: "Test email sent successfully" });
    } else {
      res
        .status(500)
        .json({
          message: "Failed to send test email",
          error: emailResult.error,
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
