const mongoose = require("mongoose");
const { difficultyLevel } = require("../constants");
const { Schema } = mongoose;

const lessonSchema = new Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quiz: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        },
    ],
    difficulty: {
        type: String,
        enum: [
            difficultyLevel.EASY,
            difficultyLevel.MEDIUM,
            difficultyLevel.HARD,
        ],
    },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
