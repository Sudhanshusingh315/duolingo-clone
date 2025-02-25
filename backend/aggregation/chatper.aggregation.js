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
                        },
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
                        },
                    },
                ],
                as: "matchesData",
            },
        },

        {
            $set: {
                id: "$_id",
                quiz: { $concatArrays: ["$objectiveQuiz", "$matchesData"] },
            },
        },
        {
            $unset: ["matchesData", "objectiveQuiz", "__v", "_id"],
        },
    ];
};

module.exports = {
    getChapterPipeline,
};
