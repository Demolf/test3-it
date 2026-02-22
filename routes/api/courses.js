// routes/chat.js
const express = require("express");
const router = express.Router();

const { courses } = require("./../../models");

// GET /api/courses — получить
router.get("/", async (req, res) => {
  res.json(await courses.gets());
});

// GET /api/courses — получить
router.get("/:id", async (req, res) => {
  res.json(await courses.getId(req.params.id));
});

module.exports = router;
