const mongoose = require("mongoose");
const { lessonType } = require("../../constants");
const { Schema } = mongoose;

const objectiveSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            text: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
            },
        },
    ],
});

const Objective = mongoose.model(lessonType.OBJECTIVE, objectiveSchema);

module.exports = Objective;
