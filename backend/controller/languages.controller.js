const Language = require("../models/languageModel");

const addLanguage = async (req, res) => {
    const { name, code } = req.body;

    try {
        const language = await Language.create({
            name,
            code,
        });
        if (!language) {
            throw new Error("Something bad happened, couldn't save course");
        }

        return res.status(201).json({
            success: true,
            message: "language added, add courses now",
            data: language,
        });
    } catch (err) {
        console.log("err", err);
        return res.status(401).json({
            success: false,
            error: err.message,
            message: "Couldn't create language at the moment",
        });
    }
};

module.exports = {
    addLanguage,
};
