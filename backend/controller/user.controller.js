const { json } = require("express");
const { selectedLanguages } = require("../aggregation/user.aggregation");
const User = require("../models/userModel");
const { generatingToken } = require("../utils/jwtToken");
const UserProgression = require("../models/userProgression");
const { default: mongoose } = require("mongoose");
const Course = require("../models/courseModel");
const {
    getFirstChatperToStart,
} = require("../aggregation/courses.aggreagation");

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

const userProgressionLanguage = async (req, res) => {
    let { languageId } = req.params;
    let userId = req.body.userId;
    console.log("userid", userId);
    console.log("languageId", languageId);
    try {
        userId = new mongoose.Types.ObjectId(userId);
        languageId = new mongoose.Types.ObjectId(languageId);

        const result = await UserProgression.aggregate([
            {
                $match: {
                    userId,
                    userLang: languageId,
                },
            },
        ]);
        console.log("result of progression", result);
        if (!result?.length) {
            throw new Error("No user progression was found");
        }

        return res.status(201).json({
            success: true,
            message: "user progression fetched successfully",
            data: result,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const userProgressionEndQuiz = async (req, res) => {
    const {
        currentCourse,
        currentChater,
        userProgressionId,
        heart,
        completedChapter,
    } = req.body;
    console.log(req.body);
    let nextChapter, nextCourse;
    if (completedChapter?.includes(currentChater)) {
        console.log("here about the currentChapter");
        return res.status(200).json({
            success: true,
            message: "User has done this before",
        });
    }
    try {
        const courseInfo = await Course.find({
            _id: currentCourse,
        });
        if (!courseInfo) throw new Error("invalid course info");
        console.log("courserInfo", courseInfo);
        const indexOfChapter = courseInfo[0]?.chapters?.findIndex(
            (id) => id.toString() === currentChater
        );

        console.log("indexOfChapter", indexOfChapter);

        if (indexOfChapter < courseInfo[0].chapters.length - 1) {
            let value = indexOfChapter;
            nextChapter = courseInfo[0].chapters[value + 1];
            nextCourse = currentCourse;
        } else {
            // start next course;
            let removeLimit = true;
            let courseInfo = getFirstChatperToStart(removeLimit);

            nextCourse = courseInfo[0].id;
            nextChapter = courseInfo[0].chapter;
        }
        // now i have the nextCourse and nextChapter. put them through

        console.log(
            `
            currentChapter chapter : ${nextChapter},
            current Course : ${nextCourse},
            completed course : ${nextCourse},
            completed Chapter : ${currentChater}
            `
        );

        const updateUserProgression = await UserProgression.findByIdAndUpdate(
            userProgressionId,
            {
                $set: {
                    currentChapter: nextChapter,
                    currentCourse: nextCourse,
                },

                $addToSet: {
                    completedCourses:
                        currentCourse === nextCourse ? null : nextCourse,
                    completedChaters: currentChater,
                },
                heart,
            }
        );

        return res.status(201).json({
            success: true,
            message: "user",
            data: updateUserProgression,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
    /*










    1) get the details 

        languageId
        userId
        currentCourseid
        currentChapterid 
        hearts left
        nextChapter
        or 
        nextCourse

    2)  move the user to next chapter only if it's possible
        otherwise start the new course
        
        add currectChapterId to 
        the completedChapter 
        since it's finised

        

    
    */
};

module.exports = {
    login,
    register,
    userSelectedLanguages,
    userProgressionLanguage,
    userProgressionEndQuiz,
};
