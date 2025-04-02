const { instance } = require("../utils/razorpay");
const { configEnv } = require("../constants");
// var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

const checkout = async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: Number(amount * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    // one you have order, store this in db
    console.log("order", order);
    res.status(200).json({
        success: true,
        key: configEnv.razorpay_id,
        data: order,
    });
};

const paymentVerification = async (req, res) => {
    console.log("payment verification", req.body);

    // check for verificaiton
    // update the db with orders and hearts
    // redirect.
    res.status(200).json({});
};

const success = async (req, res) => {
    res.status(201).json({
        success: true,
    });
};

module.exports = {
    checkout,
    paymentVerification,
    success,
};
