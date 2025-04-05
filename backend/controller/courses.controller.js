const { default: mongoose } = require("mongoose");
const Course = require("../models/courseModel");

const addCourse = async (req, res) => {
    // todo: add validation later
    const {
        languageId,
        name,
        description,
        difficultyLevel,
        chapterId,
        courseId,
    } = req.body;
    try {
        if (courseId) {
            const courseUpdate = await Course.findByIdAndUpdate(
                { _id: courseId },
                {
                    $addToSet: { chapters: chapterId },
                }
            );
            console.log("courseUpdate", courseUpdate);
            if (!courseUpdate) throw new Error("something");
            return res.status(201).json({
                success: true,
                message: "Course created successfully",
                data: courseUpdate,
            });
        }

        const course = await Course.create({
            languageId,
            name,
            description,
            difficultyLevel,
            chapters: [chapterId],
        });
        if (!course) {
            throw new Error("Something bad happened, couldn't save course");
        }

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (err) {
        console.log("err", err);
        return res.status(401).json({
            success: false,
            error: err.message,
            message: "Couldn't save course",
        });
    }
};

const getAllCourse = async (req, res) => {
    let { langId } = req.params;
    try {
        if (!langId) {
            throw new Error("Selecte Language to get all courses.");
        }
        langId = new mongoose.Types.ObjectId(langId);
        const data = await Course.aggregate([
            {
                $match: {
                    languageId: {
                        $eq: langId,
                    },
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

        return res.status(200).json({
            success: true,
            message: "Course data recieved successfully",
            data,
        });
    } catch (err) {
        console.log("err", err.message);
        return res.status(401).json({
            success: false,
            error: err.message,
            message: "could not get courses at the moment",
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.aggregate([
            {
                $match: {
                    languageId: { $exists: true, $ne: false },
                },
            },
        ]);

        return res.status(201).json({
            sucess: true,
            data: allCourses,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            message: "Can not fetch courses at the moment",
        });
    }
};

module.exports = {
    addCourse,
    getAllCourse,
    getAllCourses,
};
