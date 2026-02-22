const express = require("express");
const router = express.Router();

const { books } = require("./../../models");

// GET /api/books — получить
router.get("/", async (req, res) => {
  res.json(await books.gets());
});

// GET /api/books — получить
router.get("/:id", async (req, res) => {
  res.json(await books.getId(req.params.id));
});

// POST /api/books — отправить
router.post("/", async (req, res) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: "Имя и сообщение обязательны" });
  }

  const message = {
    id: Date.now(),
    name: name.trim(),
    content: content.trim(),
    time: new Date().toISOString(),
  };

  const info = await books.insert([content.trim(), name.trim()]);

  res.status(201).json({ info, message });
});

module.exports = router;
