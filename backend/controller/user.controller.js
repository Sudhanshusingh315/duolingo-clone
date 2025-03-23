const passport = require("passport");

const userAuth = () => {
    return passport.authenticate("google", { scope: ["email", "profile"] });
};

const userTest = async (req, res) => {
    res.send("<div><h1>Hello, user is authenticated</h1></div>");
};

module.exports = {
    userAuth,
    userTest,
};
