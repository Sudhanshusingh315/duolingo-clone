require("dotenv").config();
const configEnv = {
    mongodbConnectionString: process.env.DATABASE,
};

const difficultyLevel = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
};

const lessonType = {
    OBJECTIVE: "objective",
    MEMORYGAME: "memoryGame",
    MATCH: "match",
    DRAGANDDROP: "dragAndDrop",
    AUDIOANDTYPE: "audioAndType",
};

module.exports = { configEnv, difficultyLevel, lessonType };
