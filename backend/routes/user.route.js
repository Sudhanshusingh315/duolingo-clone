const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
    login,
    register,
    userSelectedLanguages,
    userProgressionLanguage,
    userProgressionEndQuiz,
} = require("../controller/user.controller");
const { protected } = require("../middlewares/protected");

router.post("/user-login", login);
router.post("/user-register", register);
router.post("/user/opted-languages", protected, userSelectedLanguages);

// user progression
router.get("/user/progression/:languageId", protected, userProgressionLanguage);
router.patch("/user/progression/endQuiz", protected, userProgressionEndQuiz);

module.exports = router;
