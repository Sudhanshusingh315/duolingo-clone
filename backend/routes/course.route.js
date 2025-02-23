const express = require("express");
const { addCourse, getAllCourse } = require("../controller/courses.controller");
const router = express.Router();

router.post("/add-course", addCourse);
router.get("/get-course/:langId", getAllCourse);

module.exports = router;
