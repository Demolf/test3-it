const express = require("express");
const router = express.Router();

const { recommendations } = require("./../../models");

// GET /api/recommendations — получить
router.get("/", async (req, res) => {
  res.json(await recommendations.gets());
});

router.get("/:id", async (req, res) => {
  const data = await recommendations.gets();
  for (let q in data.get) {
    return res.json({ is: true, get: data.get[q] });
  }
  return res.json({ is: false, get: null });
});

module.exports = router;
