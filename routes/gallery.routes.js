const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/gallery.controller");

// GET /api/gallery - Get all images
router.get("/", galleryController.getAllImages);

// GET /api/gallery/:id - Get single image
router.get("/:id", galleryController.getImageById);

// POST /api/gallery - Create new image
router.post("/", galleryController.createImage);

// PUT /api/gallery/:id - Update image
router.put("/:id", galleryController.updateImage);

// DELETE /api/gallery/:id - Delete image
router.delete("/:id", galleryController.deleteImage);

// PUT /api/gallery/order - Update image order
router.put("/order/update", galleryController.updateImageOrder);

module.exports = router;
