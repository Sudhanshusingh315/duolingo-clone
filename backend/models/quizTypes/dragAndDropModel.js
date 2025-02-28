const mongoose = require("mongoose");
const { lessonType } = require("../../constants");
const { Schema } = mongoose;

const dragAndDropSchema = new Schema({
    categories: [{ type: String, required: true }],
    words: [
        {
            text: {
                type: String,
            },
            category: {
                type: String,
            },
            _id: false,
        },
    ],
});

const DragandDrop = mongoose.model(lessonType.DRAGANDDROP, dragAndDropSchema);

module.exports = DragandDrop;
