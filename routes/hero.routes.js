const express = require("express");
const {
  getHero,
  addHero,
  updateHero,
  deleteHero,
} = require("../controllers/hero.controller");

const router = express.Router();

router.get("/", getHero);
router.post("/", addHero);
router.put("/:id", updateHero);
router.delete("/:id", deleteHero);

module.exports = router;
