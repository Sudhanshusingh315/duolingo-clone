const express = require("express");
const {
    addChapter,
    getChapter,
    getAllChapters,
} = require("../controller/chapters.controller");

const router = express.Router();

router.post("/add-chapter", addChapter);
router.get("/get-chapter/:chapterId", getChapter);
router.get("/get-chapters", getAllChapters);
module.exports = router;
