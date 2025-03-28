const { default: mongoose } = require("mongoose");
const Language = require("../models/languageModel");
const User = require("../models/userModel");

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

const addUserLanguage = async (req, res) => {
    let { userId } = req.params;
    console.log("userId", userId);
    const { languageCode } = req.body;
    userId = new mongoose.Types.ObjectId(userId);
    try {
        if (!languageCode) {
            throw new Error("language code isn't provided");
        }
        const updateUserLang = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    language: languageCode,
                },
            },
            { new: true }
        );

        if (!updateUserLang) {
            throw new Error("could not update the field");
        }

        return res.status(202).json({
            success: true,
            message: "language added",
            data: updateUserLang,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const getLanguageByCode = async (req, res) => {
    const { langCode } = req.params;
    try {
        if (!langCode) {
            throw new Error("Invalid lang coude");
        }

        const lang = await Language.aggregate([
            {
                $match: {
                    code: langCode,
                },
            },
            {
                $set: {
                    id: "$_id",
                },
            },
            {
                $unset: ["_id", "__v"],
            },
        ]);

        if (!lang) throw new Error("No Language was found");

        return res.status(201).json({
            success: true,
            message: "Language found",
            data: lang,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            message: error.messgae,
        });
    }
};

module.exports = {
    addLanguage,
    getLanguages,
    addUserLanguage,
    getLanguageByCode,
};
