const mongoose = require("mongoose");
const { Schema } = mongoose;

// User progresssion
let min = [0, "The heart value needs to be greater than or equal to 0"];
let max = [5, "The heart value needs to be less than or equal to 5"];

const userProgressionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userLang: {
        type: Schema.Types.ObjectId,
        ref: "Language",
    },
    completedCourses: {
        type: Array,
    },
    completedChaters: {
        type: Array,
    },
    currentChapter: {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
        default: null,
    },
    currentCourse: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: null,
    },
    completedChapter: { type: Array, default: null },
    heart: { type: Number, min: min, max: max, default: 5 },
});

const UserProgression = mongoose.model(
    "UserProgression",
    userProgressionSchema
);
module.exports = UserProgression;
