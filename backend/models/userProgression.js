const mongoose = require("mongoose");
const { Schema } = mongoose;

// User progresssion

const userProgressionSchema = new Schema({
    // language,
});

const UserProgression = mongoose.model(
    "UserProgression",
    userProgressionSchema
);
module.exports = UserProgression;
