const express = require("express");
const router = express.Router();

const { films } = require("./../models");

router.get("/", async (req, res) => {
  const data = await films.gets();
  res.render("main/films", {
    title: "Фильмотека",
    data,
  });
});

module.exports = router;
