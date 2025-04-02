const Razorpay = require("razorpay");
const { configEnv } = require("../constants");

const instance = new Razorpay({
    key_id: configEnv.razorpay_id,
    key_secret: configEnv.razorpay_secrete,
});

module.exports = {
    instance,
};
