const express = require("express");
const router = express.Router();

const { recommendations } = require("./../models");

router.get("/", async (req, res) => {
  const data = await recommendations.gets();
  res.render("main/recommendations", {
    title: "Рекомендации специально для тебя",
    data,
  });
});

module.exports = router;
