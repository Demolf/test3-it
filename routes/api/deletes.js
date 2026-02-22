const express = require("express");
const router = express.Router();

const { courses, films, books, content } = require("./../../models");

// POST /api/delete — отправить
router.post("/", async (req, res) => {
  const { id, type } = req.body;

  let info2 = {};

  if (type == "books") info2 = await books.deleteContentId(id);
  else if (type == "films") info2 = await films.deleteContentId(id);
  else if (type == "courses") info2 = await courses.deleteContentId(id);

  const info = await content.delete(id);

  res.status(201).json({ info, info2 });
});

module.exports = router;
