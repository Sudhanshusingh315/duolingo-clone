const mongoose = require("mongoose");
const { lessonType } = require("../../constants");
const { Schema } = mongoose;

const matchSchema = new Schema({
    statement: {
        type: String,
        default: "Match the following",
    },
    columns: [
        {
            text: { type: String, required: true },
            match: { type: String, required: true },
        },
    ],
});

const Match = mongoose.model(lessonType.MATCH, matchSchema);

module.exports = Match;
