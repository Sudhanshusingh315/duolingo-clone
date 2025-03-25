const express = require("express");
const passport = require("passport");
const router = express.Router();
const { login, register } = require("../controller/user.controller");

router.post("/user-login", login);
router.post("/user-register", register);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
module.exports = router;
