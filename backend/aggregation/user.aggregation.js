const { default: mongoose } = require("mongoose");

const selectedLanguages = (userId) => {
    userId = new mongoose.Types.ObjectId(userId);

    return [
        {
            $match: {
                _id: userId,
            },
        },
        {
            $set: {
                id: "$_id",
            },
        },
        {
            $unset: ["_id", "__v", "email", "password"],
        },
    ];
};

module.exports = {
    selectedLanguages,
};
