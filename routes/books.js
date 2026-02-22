const express = require("express");
const router = express.Router();

const { books } = require("./../models");

router.get("/", async (req, res) => {
  const data = await books.gets();
  res.render("main/books", {
    title: "Книги",
    data,
  });
});

module.exports = router;
