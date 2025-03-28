const jwt = require("jsonwebtoken");
const { configEnv } = require("../constants");
exports.generatingToken = async (userCredentials) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(userCredentials, configEnv.jwtSecret, {
            expiresIn: "2d",
        });
        resolve(token);
    });
};
