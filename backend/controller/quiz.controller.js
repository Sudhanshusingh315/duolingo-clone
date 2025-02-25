const Match = require("../models/quizTypes/matchModel");
const Objective = require("../models/quizTypes/objectiveModel");

const addObjectiveQuiz = async (req, res) => {
    const { question, options } = req.body;
    try {
        if (!question || !options) {
            throw new Error("Either Question or proper Options are missing");
        }

        let objectiveQuiz;
        objectiveQuiz = await Objective.create({
            question,
            options,
        });
        if (!objectiveQuiz) {
            throw new Error("Quiz can not be saved at the moment");
        }

        return res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: objectiveQuiz,
        });
    } catch (err) {
        console.log("error", err.message);
        return res.status(401).json({
            success: false,
            message: "Failed to create message",
            error: err.message,
        });
    }
};

const addMatchQuiz = async (req, res) => {
    const { statement, columns } = req.body;
    try {
        if (!statement || !columns) {
            throw new Error("Match quiz data and format in incorrect");
        }
        let matchQuiz = await Match.create({
            statement,
            columns,
        });
        return res.status(201).json({
            success: true,
            message: "Match quiz created successfully",
            data: matchQuiz,
        });
    } catch (err) {
        console.log("err", err.message);
        return res.status(401).json({
            success: false,
            message: "something bag happened",
            err: err.message,
        });
    }
};

module.exports = {
    addObjectiveQuiz,
    addMatchQuiz,
};
