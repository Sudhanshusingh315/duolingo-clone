const Language = require("../models/languageModel");

// todo: validate all the requests

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

const getLanguages = async (req, res) => {
    try {
        const languages = await Language.aggregate([
            {
                $set: {
                    id: "$_id",
                },
            },
            {
                $unset: ["_id", "__v"],
            },
        ]);
        if (!languages) {
            throw new Error("Couldn't get languages at the moment");
        }

        return res.status(201).json({
            success: true,
            messgae: "Languages loaded successfully",
            data: languages,
        });
    } catch (error) {
        console.log("err", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addLanguage,
    getLanguages,
};
