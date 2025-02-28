const DragandDrop = require("../models/quizTypes/dragAndDropModel");
const Match = require("../models/quizTypes/matchModel");
const Memorymatch = require("../models/quizTypes/memoryMatchModle");
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
        if (!matchQuiz) {
            throw new Error("Could not finish ther req, operation failed");
        }
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

const addMemoryMatchQuiz = async (req, res) => {
    const { statement, options } = req.body;
    try {
        if (!statement || !options) {
            throw new Error("Incorrect data, can not be posted");
        }

        let memoryMatch = await Memorymatch.create({
            statement,
            options,
        });
        if (!memoryMatch) {
            throw new Error("Could not finish ther req, operation failed");
        }
        return res.status(201).json({
            success: true,
            message: "Memory match quiz successfully added",
            data: memoryMatch,
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

const addDragAndDrop = async (req, res) => {
    const { categories, words } = req.body;
    try {
        if (!categories || !words) {
            throw new Error("Incorrect data, can not be posted");
        }

        let dragAndDrop = await DragandDrop.create({
            categories,
            words,
        });
        if (!dragAndDrop) {
            throw new Error("Could not finish ther req, operation failed");
        }
        return res.status(201).json({
            success: true,
            message: "Memory match quiz successfully added",
            data: dragAndDrop,
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
    addMemoryMatchQuiz,
    addDragAndDrop
};
