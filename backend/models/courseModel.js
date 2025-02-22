const mongoose = require("mongoose");
const { difficultyLevel } = require("../constants");
const { Schema } = mongoose;

const courseSchema = new Schema({
    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: String,
        enum: [
            difficultyLevel.EASY,
            difficultyLevel.MEDIUM,
            difficultyLevel.HARD,
        ],
        required: true,
    },
    chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            default: undefined,
        },
    ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
