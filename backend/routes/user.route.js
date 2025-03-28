const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
    login,
    register,
    userSelectedLanguages,
} = require("../controller/user.controller");
const { protected } = require("../middlewares/protected");

router.post("/user-login", login);
router.post("/user-register", register);
router.post("/user/opted-languages", protected, userSelectedLanguages);

// user progression

module.exports = router;
