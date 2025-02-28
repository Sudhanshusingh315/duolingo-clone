const mongoose = require("mongoose");
const { lessonType } = require("../constants");

const getChapterPipeline = (id) => {
    let chapterId = new mongoose.Types.ObjectId(id);
    return [
        {
            $match: {
                _id: chapterId,
            },
        },
        {
            $set: {
                quiz: {
                    $map: {
                        input: "$quiz",
                        as: "q",
                        in: { $toObjectId: "$$q" },
                    },
                },
            },
        },
        {
            $lookup: {
                from: "objectives",
                localField: "quiz",
                foreignField: "_id",
                pipeline: [
                    {
                        $set: {
                            quizType: lessonType.OBJECTIVE,
                            id: "$_id",
                        },
                    },
                    {
                        $unset: ["_id", "__v"],
                    },
                ],
                as: "objectiveQuiz",
            },
        },
        {
            $lookup: {
                from: "matches",
                localField: "quiz",
                foreignField: "_id",
                pipeline: [
                    {
                        $set: {
                            quizType: lessonType.MATCH,
                            id: "$_id",
                        },
                    },
                    {
                        $unset: ["_id", "__v"],
                    },
                ],
                as: "matchesData",
            },
        },
        {
            $lookup: {
                from: "memorygames",
                localField: "quiz",
                foreignField: "_id",
                pipeline: [
                    {
                        $set: {
                            quizType: lessonType.MEMORYGAME,
                            id: "$_id",
                        },
                    },
                    {
                        $unset: ["_id", "__v"],
                    },
                ],
                as: "memoryMatchData",
            },
        },
        {
            $lookup: {
                from: "draganddrops",
                localField: "quiz",
                foreignField: "_id",
                pipeline: [
                    {
                        $set: {
                            quizType: lessonType.DRAGANDDROP,
                            id: "$_id",
                        },
                    },
                    {
                        $unset: ["_id", "__v"],
                    },
                ],
                as: "dragAndDrop",
            },
        },
        {
            $set: {
                id: "$_id",
                quiz: {
                    $concatArrays: [
                        "$objectiveQuiz",
                        "$matchesData",
                        "$memoryMatchData",
                        "$dragAndDrop",
                    ],
                },
            },
        },
        {
            $unset: [
                "matchesData",
                "objectiveQuiz",
                "memoryMatchData",
                "dragAndDrop",
                "__v",
                "_id",
            ],
        },
    ];
};

module.exports = {
    getChapterPipeline,
};
