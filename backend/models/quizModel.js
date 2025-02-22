const mongoose = require("mongoose");
const { difficultyLevel, lessonType } = require("../constants");
const { Schema } = mongoose;

const quizSchema = new Schema({
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
    },
    type: {
        type: String,
        enum: [
            lessonType.AUDIOANDTYPE,
            lessonType.DRAGANDDROP,
            lessonType.MATCH,
            // todo: add this later after finishing the rest of the quizes.
            lessonType.MEMORYGAME,
            lessonType.OBJECTIVE,
        ],
    },
    // data about the schema design
    data: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "type",
    },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
