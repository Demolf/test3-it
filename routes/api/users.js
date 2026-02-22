// routes/chat.js
const express = require("express");
const router = express.Router();

const { auth } = require("./../../models");

// GET /api/auth — получить
router.get("/", async (req, res) => {
  res.json(await auth.gets());
});

router.get("/:id", async (req, res) => {
  res.json(await auth.gets(req.params.id));
});

module.exports = router;
