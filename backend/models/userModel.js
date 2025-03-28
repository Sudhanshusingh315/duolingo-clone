const mongoose = require("mongoose");
const { countryCodeEnum } = require("../constants");
const { Schema } = mongoose;

// User schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    language: [
        {
            type: String,
            enum: countryCodeEnum,
        },
    ],
    // cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food", default: [] }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
