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

const passportGoogleCredentials = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
};

module.exports = {
    configEnv,
    difficultyLevel,
    lessonType,
    passportGoogleCredentials,
};
