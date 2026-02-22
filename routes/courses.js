const express = require("express");
const router = express.Router();

const { courses } = require("./../models");

router.get("/", async (req, res) => {
  const data = await courses.gets();
  res.render("main/courses", {
    title: "Образовательные ресурсы",
    data,
  });
});

module.exports = router;
