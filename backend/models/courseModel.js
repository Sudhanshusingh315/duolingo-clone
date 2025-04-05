const mongoose = require("mongoose");
const { difficultyLevel } = require("../constants");
const { Schema } = mongoose;

const courseSchema = new Schema({
    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
