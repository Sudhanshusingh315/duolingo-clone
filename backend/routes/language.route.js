const express = require("express");
const {
    addLanguage,
    getLanguages,
} = require("../controller/languages.controller");
const router = express.Router();

router.post("/add-language", addLanguage);
router.get("/languages", getLanguages);

module.exports = router;
