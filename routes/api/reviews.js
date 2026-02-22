const express = require("express");
const router = express.Router();

const { reviews } = require("./../../models");

// GET /api/reviews — получить
router.get("/", async (req, res) => {
  res.json(await reviews.gets());
});

router.get("/content/:id", async (req, res) => {
  return res.json(await reviews.getContentId(req.params.id));
});

router.get("/:id", async (req, res) => {
  return res.json(await reviews.getId(req.params.id));
});

router.post("/", async (req, res) => {
  const { comment, rating, contentId } = req.body;
  if (!!req.session.userId) {
    if (!comment || !rating || !contentId)
      return res.status(400).json({ msg: "Коментаррия и рейтинг обязательны" });

    const data = [
      Number(req.session.userId),
      Number(contentId),
      Number(rating) || 0,
      comment.trim(),
    ];

    const info = await reviews.insert(data);

    res.status(201).json({ info, data });
  } else return res.status(400).json({ msg: "Войти или Регистрация" });
});

module.exports = router;
