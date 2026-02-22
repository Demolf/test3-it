const express = require("express");
const router = express.Router();

const { films } = require("./../../models");

// GET /api/films — получить
router.get("/", async (req, res) => {
  res.json(await films.gets());
});

// GET /api/films — получить
router.get("/:id", async (req, res) => {
  res.json(await films.getId(req.params.id));
});

module.exports = router;
