// controllers/contactMessageController.js
const ContactMessage = require("../models/Contact");
const { sendReplyEmail } = require("../utils/emailService");
// Get all messages with sorting and filtering
exports.getAllMessages = async (req, res) => {
  try {
    const { status, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    let filter = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const messages = await ContactMessage.find(filter).sort(sortOptions);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single message
exports.getMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new message from contact form
exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update message (change status, add reply, etc.)
exports.updateMessage = async (req, res) => {
  try {
    const { status, repliedMessage, sendEmail } = req.body;

    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // If we're sending a reply email
    if (sendEmail && repliedMessage && repliedMessage.trim()) {
      try {
        const emailResult = await sendReplyEmail(
          message.email,
          `Re: ${message.subject}`,
          repliedMessage,
          message.message
        );

        if (!emailResult.success) {
          return res.status(500).json({
            message: "Failed to send email",
            error: emailResult.error,
          });
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        return res.status(500).json({
          message: "Failed to send email",
          error: emailError.message,
        });
      }
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status, repliedMessage },
      { new: true, runValidators: true }
    );

    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
