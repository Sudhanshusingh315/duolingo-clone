const { json } = require("express");
const { selectedLanguages } = require("../aggregation/user.aggregation");
const User = require("../models/userModel");
const { generatingToken } = require("../utils/jwtToken");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            throw new Error("Email is not registered");
        }
        if (userExists) {
            const data = { email, id: userExists._id };
            const token = await generatingToken(data);
            res.status(201).json({
                success: true,
                message: "logged in",
                name: userExists.name,
                data,
                accessToken: token,
            });
        } else {
            throw new Error("Email or Password invalid");
        }
    } catch (err) {
        console.log("err", err);
        res.status(401).json({
            success: false,
            msg: err.message,
        });
    }
};

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("email already registered");
        }
        // todo: bcrypt this password
        const newUser = await User.create({
            name,
            email,
            password,
        });
        // user created now send the token
        const data = { name, email, id: newUser._id };
        const token = await generatingToken(data);
        res.status(201).json({
            success: true,
            msg: "user created successfully",
            accessToken: token,
            id: data?.id,
            name: name,
        });
    } catch (err) {
        console.log("error", err);
        res.status(401).json({
            success: false,
            msg: err.message,
        });
    }
};

const userSelectedLanguages = async (req, res) => {
    console.log("req body", req.body.userId);
    const userId = req.body.userId;

    try {
        const userLang = await User.aggregate(selectedLanguages(userId));

        return res.status(201).json({
            success: true,
            data: userLang,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    login,
    register,
    userSelectedLanguages,
};
