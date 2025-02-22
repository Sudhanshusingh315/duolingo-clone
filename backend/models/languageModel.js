const mongoose = require("mongoose");
const { Schema } = mongoose;

const languageSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
