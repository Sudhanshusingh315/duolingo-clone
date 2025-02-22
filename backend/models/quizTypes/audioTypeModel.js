const mongoose = require("mongoose");
const { lessonType } = require("../../constants");
const { Schema } = mongoose;

const audioSchema = new Schema({
    statement: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
});

const AudioType = mongoose.model(lessonType.AUDIOANDTYPE, audioSchema);

module.exports = AudioType;
