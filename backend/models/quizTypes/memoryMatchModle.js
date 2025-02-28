// todo: do this later.
const mongoose = require("mongoose");
const { lessonType } = require("../../constants");
const { Schema } = mongoose;

const memoryMatchSchema = new Schema({
    statement: {
        type: String,
        required: true,
    },
    options: [
        {
            _id: false,
            src: String,
            text: String,
            meaning: String,
        },
    ],
});

const Memorymatch = mongoose.model(lessonType.MEMORYGAME, memoryMatchSchema);

module.exports = Memorymatch;
