const passport = require("passport");
const { passportGoogleCredentials } = require("../constants");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = passportGoogleCredentials;
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/user-test",
        },
        function (accessToken, refreshToken, profile, cb) {
            // user your own login page G
            return cb(null, profile);

            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    cb(null, user);
});
