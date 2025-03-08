const { default: mongoose } = require("mongoose");
const Chapter = require("../models/chapterModel");
const {
    getChapterPipeline,
    getAllChaptersPipeline,
} = require("../aggregation/chatper.aggregation");

const addChapter = async (req, res) => {
    const { courseId, title, description } = req.body;
    try {
        let chapter;

        chapter = await Chapter.create({
            courseId,
            title,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Chapter added",
            data: chapter,
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: err.message,
            message: "Somethig happened",
        });
    }
};

const getChapter = async (req, res) => {
    let { chapterId } = req.params;
    chapterId = new mongoose.Types.ObjectId(chapterId);
    try {
        if (!chapterId) {
            throw new Error("Incorrect chapter Id");
        }
        const chapter = await Chapter.aggregate(getChapterPipeline(chapterId));

        return res.status(201).json({
            success: true,
            data: chapter,
        });
    } catch (err) {
        console.log("error message", err.message);
        return res.status(401).json({
            success: false,
            message: "Operation Failed",
            error: err.messgae,
        });
    }
};

const getAllChapters = async (req, res) => {
    const chapters = await Chapter.aggregate(getAllChaptersPipeline());
    return res.status(201).json({
        success: true,
        data: chapters,
    });
};

module.exports = {
    addChapter,
    getChapter,
    getAllChapters,
    // addMultipleChpaters,
    // getChapter,
    // DeleteMultipleChapters
    // DeleteChapters,
    // Edit Chapters,
};
