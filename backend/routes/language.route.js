const express = require("express");
const { addLanguage } = require("../controller/languages.controller");
const router = express.Router();

router.post("/add-language", addLanguage);

module.exports = router;
