const express = require("express");
const router = express.Router();

const auth = require("./auth");
const books = require("./books");
const users = require("./users");
const search = require("./search");
const recommendations = require("./recommendations");
const courses = require("./courses");
const films = require("./films");
const reviews = require("./reviews");
const contents = require("./contents");
const deletes = require("./deletes");

router.use("/auth", auth);
router.use("/books", books);
router.use("/search", search);
router.use("/users", users);
router.use("/recommendations", recommendations);
router.use("/delete", deletes);
router.use("/contents", contents);
router.use("/films", films);
router.use("/reviews", reviews);
router.use("/courses", courses);

module.exports = router;
