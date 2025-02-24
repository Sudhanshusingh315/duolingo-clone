const express = require("express");
const {
    quiz,
    addObjectiveQuiz,
    addMatchQuiz,
} = require("../controller/quiz.controller");
const router = express.Router();

router.post("/add-quiz", quiz);
router.post("/add-objectiveQuiz", addObjectiveQuiz);
router.post("/add-matchQuiz", addMatchQuiz);
module.exports = router;
