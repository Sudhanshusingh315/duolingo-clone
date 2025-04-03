require("dotenv").config();
const configEnv = {
    mongodbConnectionString: process.env.DATABASE,
    jwtSecret: process.env.jwt,
    razorpay_id: process.env.RAZORPAY_ID,
    razorpay_secrete: process.env.RAZORPAY_SECRETE,
    razorpay_webhook_secrete: process.env.WEBHOOK_SECRETE,
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

const countryCodeEnum = [
    "US",
    "CA",
    "GB",
    "AU",
    "IN",
    "DE",
    "FR",
    "JP",
    "CN",
    "BR",
];

const STATUS = { PENDING: "PENDING", COMPLETED: "COMPLETED" };

module.exports = {
    configEnv,
    difficultyLevel,
    lessonType,
    passportGoogleCredentials,
    countryCodeEnum,
    STATUS,
};
