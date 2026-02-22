const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.session);
  res.render("main/resources", {
    title: "Онлайн-ресурсы",
  });
});

module.exports = router;
