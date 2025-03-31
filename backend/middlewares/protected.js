const jwt = require("jsonwebtoken");
const { configEnv } = require("../constants");
// middleware for protection
function protected(req, res, next) {
    try {
        let token = req.headers["authorization"];
        console.log("this is token", token);
        if (!token) throw new Error("invalid token");
        token = token.split(" ")[1];
        if (token === null) {
            throw new Error("can not find token, login again");
        }
        if (!token) {
            throw new Error("Not Authorized, Login");
        }
        const decoded = jwt.verify(token, configEnv.jwtSecret);
        req.body.userId = decoded.id;
        next();
    } catch (err) {
        console.log("error from protected.js", err);
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = { protected };
