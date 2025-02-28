const express = require("express");
const {
    addObjectiveQuiz,
    addMatchQuiz,
    addMemoryMatchQuiz,
    addDragAndDrop,
} = require("../controller/quiz.controller");
const router = express.Router();

router.post("/add-objectiveQuiz", addObjectiveQuiz);
router.post("/add-matchQuiz", addMatchQuiz);
router.post("/add-memoryMatchQuiz", addMemoryMatchQuiz);
router.post("/add-dragAndDrop", addDragAndDrop);
module.exports = router;
