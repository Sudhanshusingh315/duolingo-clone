const mongoose = require("mongoose");
const { Schema } = mongoose;

const chapterSchema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    quiz: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        },
    ],
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
