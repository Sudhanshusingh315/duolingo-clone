const express = require("express");
const {
    addCourse,
    getAllCourse,
    getAllCourses,
} = require("../controller/courses.controller");
const router = express.Router();

router.post("/add-course", addCourse);
router.get("/get-course/:langId", getAllCourse);
router.get("/get-courses", getAllCourses);
module.exports = router;
