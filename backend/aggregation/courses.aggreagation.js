const getFirstChatperToStart = (removeLimit) => {
    return [
        {
            $sort: {
                _id: 1,
            },
        },
        {
            $set: {
                id: "$_id",
            },
        },
        {
            $unset: [
                "_id",
                "languageId",
                "name",
                "description",
                "__v",
                "difficultyLevel",
            ],
        },
        {
            $set: {
                chapters: { $arrayElemAt: ["$chapters", 0] },
            },
        },
        ...(!removeLimit ? [{ $limit: 1 }] : []),
    ];
};

module.exports = {
    getFirstChatperToStart,
};
