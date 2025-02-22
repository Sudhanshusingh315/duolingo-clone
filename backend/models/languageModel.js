const mongoose = require("mongoose");
const { Schema } = mongoose;

const languageSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        // todo: this sould be an enum of all the country codes

        type: String,
        require: true,
    },
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
