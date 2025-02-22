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
            isCorrect: Boolean,
        },
    ],
});

const Objective = mongoose.model(lessonType.OBJECTIVE, objectiveSchema);

module.exports = Objective;
