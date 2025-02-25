const express = require("express");
const { addChapter, getChapter } = require("../controller/chapters.controller");

const router = express.Router();

router.post("/add-chapter", addChapter);
router.get("/get-chapter/:chapterId", getChapter);
module.exports = router;
