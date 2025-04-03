const express = require("express");
const { protected } = require("../middlewares/protected");
const router = express.Router();
const {
    checkout,
    paymentVerification,
    success,
} = require("../controller/payments.controller");

router.post("/checkout", protected, checkout);

router.post("/paymentVerification", paymentVerification);
router.post("/success/:hearts", success);

module.exports = router;
