const express = require("express");
const router = express.Router();

const { auth } = require("./../models");

router.get("/", async (req, res) => {
  if (!!req.session.userId) {
    const user = await auth.getId(req.session.userId);
    res.render("main/profile", {
      title: "Профиль "+user.get.Name || '',
      data: {
        user: {
          Name: user.get.Name,
        },
      },
    });
  } else res.redirect("/");
});

module.exports = router;
