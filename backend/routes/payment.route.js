const express = require("express");
const router = express.Router();
const {
    checkout,
    paymentVerification,
    success,
} = require("../controller/payments.controller");

router.post("/checkout", checkout);

router.post("/paymentVerification", paymentVerification);
router.post("/success", success);

module.exports = router;
