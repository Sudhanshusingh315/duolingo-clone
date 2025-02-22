const mongoose = require("mongoose");
const { Schema } = mongoose;

const dragAndDropSchema = new Schema({
    statement: {
        type: String,
        required: true,
    },
    options: [
        {
            object: { type: String, required: true },
            bucketOptions: [{ type: String, required: true }],
            correctOrder: [{ type: String, required: true }],
        },
    ],
});

const DragandDrop = mongoose.model(lessonType.DRAGANDDROP, dragAndDropSchema);

module.exports = DragandDrop;
