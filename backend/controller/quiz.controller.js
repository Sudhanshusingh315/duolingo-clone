const { default: mongoose } = require("mongoose");
const DragandDrop = require("../models/quizTypes/dragAndDropModel");
const Match = require("../models/quizTypes/matchModel");
const Memorymatch = require("../models/quizTypes/memoryMatchModle");
const Objective = require("../models/quizTypes/objectiveModel");
const Chapter = require("../models/chapterModel");
const Course = require("../models/courseModel");

const addObjectiveQuiz = async (req, res) => {
    const { chapter, question, options, course } = req.body;
    try {
        let { id } = chapter;
        id = new mongoose.Types.ObjectId(id);

        const ChapterId = await Chapter.findById(id);
        if (!ChapterId) throw new Error("Course does not exits");

        if (!question || !options) {
            throw new Error("Either Question or proper Options are missing");
        }

        let objectiveQuiz;
        objectiveQuiz = await Objective.create({
            question,
            options,
        });

        // const updateCouse = await Course.findByIdAndUpdate({
        // })

        const updatedChapter = await Chapter.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: {
                    quiz: objectiveQuiz._id,
                },
            },
            {
                new: true,
            }
        );
        console.log("updated course", updatedCourse);
        if (!objectiveQuiz) {
            throw new Error("Quiz can not be saved at the moment");
        }
        if (updatedCourse && objectiveQuiz) {
            return res.status(201).json({
                success: true,
                message: "Quiz created successfully",
                data: objectiveQuiz,
            });
        }
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
    const { chapter, statement, columns } = req.body;
    try {
        if (!chapter) throw new Error("Matching chapter is not found");

        let { id } = chapter;
        id = new mongoose.Types.ObjectId(id);

        const ChapterId = await Chapter.findById(id);
        if (!ChapterId) throw new Error("Course does not exits");

        if (!statement || !columns) {
            throw new Error("Match quiz data and format in incorrect");
        }
        let matchQuiz = await Match.create({
            statement,
            columns,
        });
        const updatedCourse = await Chapter.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: {
                    quiz: matchQuiz._id,
                },
            },
            {
                new: true,
            }
        );
        if (!matchQuiz) {
            throw new Error("Could not finish ther req, operation failed");
        }
        return res.status(201).json({
            success: true,
            message: "Match quiz created successfully",
            data: matchQuiz,
        });
    } catch (err) {
        console.log("err", err);
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
    const { chapter, categories, words, items } = req.body;
    try {
        let { id } = chapter;

        id = new mongoose.Types.ObjectId(id);

        const ChapterId = await Chapter.findById(id);
        if (!ChapterId) throw new Error("Course does not exits");

        if (!categories || !words) {
            throw new Error("Incorrect data, can not be posted");
        }

        const wordsManipulated = Object.keys(items[0]); // Extract keys

        let itemsManipulated = items[0];

        const result = wordsManipulated
            .map((element) => {
                console.log("meow", element);
                const arr = itemsManipulated[element];

                return arr.map((value) => {
                    console.log({
                        text: value,
                        category: element,
                    });
                    return {
                        text: value,
                        category: element,
                    };
                });
            })
            .flat();

        console.log(result);

        let dragAndDrop = await DragandDrop.create({
            categories,
            words: result,
        });

        const updatedCourse = await Chapter.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: {
                    quiz: dragAndDrop._id,
                },
            },
            {
                new: true,
            }
        );

        if (!dragAndDrop) {
            throw new Error("Could not finish ther req, operation failed");
        }
        if (dragAndDrop && updatedCourse) {
            return res.status(201).json({
                success: true,
                message: "Memory match quiz successfully added",
                data: dragAndDrop,
            });
        }
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
    addDragAndDrop,
};
