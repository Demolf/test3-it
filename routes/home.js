const express = require("express");
const router = express.Router();

const { search, categories } = require("./../models");

router.get("/", async (req, res) => {
  const get = await search.gets();
  res.render("main/home", {
    title: "Главная",
    data: get,
  });
});

// Выход
router.get("/logout", (req, res) => {
  const returnTo = req.get("Referrer") || "/";

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect(returnTo);
      }
      res.clearCookie("user_sid");
      res.redirect(returnTo);
    });
  } else {
    res.redirect(returnTo);
  }
});

module.exports = router;
