// routes/chat.js
const express = require("express");
const router = express.Router();

const { search } = require("./../../models");

// GET /api/search — получить
router.get("/", async (req, res) => {
  res.json(
    await search.gets(req.query.title || null, req.query.category || null),
  );
});

module.exports = router;
