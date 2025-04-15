const { instance } = require("../utils/razorpay");
const { configEnv, STATUS } = require("../constants");
const crypto = require("crypto");

const Purchase = require("../models/purchaseModel");
const UserProgression = require("../models/userProgression");
const {
    validateWebhookSignature,
    validatePaymentVerification,
} = require("razorpay");
const { default: mongoose } = require("mongoose");

const checkout = async (req, res) => {
    const userId = req.body.userId;
    console.log("userId", userId);
    const { amount: noOfHearts, userLangId } = req.body;
    if (!userLangId) throw new Error("wrong language selected");
    const options = {
        amount: Number(noOfHearts * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    const { amount, id } = order;
    const ordeCreatedDB = await Purchase.create({
        amount,
        orderId: id,
        paymentStatus: STATUS.PENDING,
        userId,
        userLang: new mongoose.Types.ObjectId(userLangId),
    });
    console.log("order created at DB", ordeCreatedDB);
    // one you have order, store this in db
    console.log("order", order);
    res.status(200).json({
        success: true,
        key: configEnv.razorpay_id,
        data: order,
    });
};

const paymentVerification = async (req, res) => {
    try {
        const signature = req.headers["x-razorpay-signature"];
        console.log("payment verification", req.body);
        const {
            event,
            payload: {
                payment: { entity },
            },
        } = req.body;
        console.log("event", event);
        if (event === "order.paid") return res.status(200);
        const { id: payment_id, order_id } = entity;
        // check if this is the correct order_id;
        const pendingOrder = await Purchase.findOne({
            orderId: order_id,
        });
        if (!pendingOrder) {
            throw new Error("invalid payment");
        }
        console.log("pending order", pendingOrder);
        // const whatIsIt = generateHMAC(
        //     order_id,
        //     payment_id,
        //     configEnv.razorpay_webhook_secrete
        // );

        switch (event) {
            case "payment.captured":
                const digest = validateWebhookSignature(
                    JSON.stringify(req.body),
                    signature,
                    configEnv.razorpay_webhook_secrete
                );
                if (digest) {
                    const updatedOrder = await Purchase.findOneAndUpdate(
                        { orderId: pendingOrder?.orderId },
                        {
                            $set: {
                                paymentStatus: STATUS.COMPLETED,
                            },
                        }
                    );
                    console.log("updated order", updatedOrder);
                    // update the user with hearts;
                    await UserProgression.findOneAndUpdate(
                        {
                            userLang: pendingOrder?.userLang,
                            userId: pendingOrder?.userId,
                        },
                        {
                            $set: {
                                heart: pendingOrder?.amount === 5000 ? 50 : 500,
                            },
                        }
                    );
                }
                break;

            default:
                break;
        }
        // check for verificaiton
        // update the db with orders and hearts
        // redirect.
        console.log("redirecting the user");
        return res.status(200).json({
            status: "ok",
        });
    } catch (err) {
        console.log("error", err);
        return res.status(401);
    }
};

const success = async (req, res) => {
    const { hearts } = req.params;
    res.redirect(
        `https://duolingo-clone-git-main-leaderofmeows-projects.vercel.app/lesson/lang-course?payment=true&hearts=${hearts}`
    );
};

module.exports = {
    checkout,
    paymentVerification,
    success,
};
