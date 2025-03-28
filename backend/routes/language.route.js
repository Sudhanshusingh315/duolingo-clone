const express = require("express");
const {
    addLanguage,
    getLanguages,
    addUserLanguage,
    getLanguageByCode,
} = require("../controller/languages.controller");
const router = express.Router();

router.post("/add-language", addLanguage);
router.get("/get-language/:langCode", getLanguageByCode);
router.get("/languages", getLanguages);
router.post("/user/add-language/:userId", addUserLanguage);

module.exports = router;
