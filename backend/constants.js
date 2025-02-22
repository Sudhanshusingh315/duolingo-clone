require("dotenv").config();
const configEnv = {
    mongodbConnectionString: process.env.DATABASE,
};

const difficultyLevel = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
};

const lessonType = {
    OBJECTIVE: "objective",
    MEMORYGAME: "memoryGame",
    MATCH: "match",
    DRAGANDDROP: "dragAndDrop",
    AUDIOANDTYPE: "audioAndType",
};

module.exports = { configEnv, difficultyLevel, lessonType };
