const mongoose = require("mongoose");
const { STATUS } = require("../constants");
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    userLang: {
        type: mongoose.Types.ObjectId,
        ref: "Language",
        required: true,
    },
    amount: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: STATUS,
        default: STATUS.PENDING,
    },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
