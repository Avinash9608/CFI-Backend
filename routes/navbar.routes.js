const express = require("express");
const router = express.Router();
const navbarController = require("../controllers/navbar.controller");

// Get navbar items for frontend
router.get("/items", navbarController.getNavbarItems);

// Get all navbar items for admin
router.get("/items/all", navbarController.getAllNavbarItems);

// Create a new navbar item
router.post("/items", navbarController.createNavbarItem);

// Update a navbar item
router.put("/items/:id", navbarController.updateNavbarItem);

// Delete a navbar item
router.delete("/items/:id", navbarController.deleteNavbarItem);

// Get navbar configuration
router.get("/config", navbarController.getNavbarConfig);

// Update navbar configuration
router.put("/config", navbarController.updateNavbarConfig);

module.exports = router;
