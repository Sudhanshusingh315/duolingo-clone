const express = require("express");
const { userAuth, userTest } = require("../controller/user.controller");
const passport = require("passport");

const router = express.Router();

router.get(
    "/user-auth",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/user-auth/failure", (req, res) => {
    res.send("<div><h1>User Login failed try again sometime</h1></div>");
});

router.get(
    "/user-test",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173/lesson",
        failureRedirect: "/api/auth/user-auth/failure",
    })
);

router.get("/user-login", async (req, res) => {
    console.log("user-login api hit");
    console.log(JSON.stringify(req.sessionStore.sessions));
    console.log(req.profile);
});

module.exports = router;
