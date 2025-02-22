const Chapter = require("../models/chapterModel");

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

module.exports = {
    addChapter,
    // addMultipleChpaters,
    // DeleteMultipleChapters
    // DeleteChapters,
    // Edit Chapters,
};
