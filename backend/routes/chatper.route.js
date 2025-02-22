const express = require("express");
const { addChapter } = require("../controller/chapters.controller");

const router = express.Router();

router.post("/add-chapter", addChapter);

module.exports = router;
