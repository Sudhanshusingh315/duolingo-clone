const express = require("express");
const router = express.Router();

router.post("/add-course", addCourse);

module.exports = router;
