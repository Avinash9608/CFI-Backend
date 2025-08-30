const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footer.controller");

// Get footer data for frontend
router.get("/", footerController.getFooterData);

// Get all footer data for admin
router.get("/all", footerController.getAllFooterData);

// Footer Section routes
router.post("/sections", footerController.createFooterSection);
router.put("/sections/:id", footerController.updateFooterSection);
router.delete("/sections/:id", footerController.deleteFooterSection);

// Social Media routes
router.post("/social", footerController.createSocialMedia);
router.put("/social/:id", footerController.updateSocialMedia);
router.delete("/social/:id", footerController.deleteSocialMedia);

// Footer configuration
router.put("/config", footerController.updateFooterConfig);

// Newsletter subscription
router.post("/newsletter", footerController.subscribeNewsletter);

module.exports = router;
