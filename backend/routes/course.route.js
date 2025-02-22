const express = require("express");
const { addCourse } = require("../controller/courses.controller");
const router = express.Router();

router.post("/add-course", addCourse);

module.exports = router;
