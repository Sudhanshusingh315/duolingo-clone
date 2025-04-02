require("dotenv").config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const { configEnv } = require("./constants");

const app = express();
app.use(express.json());
app.use(
    session({
        // todo: add from evn, testing for now
        secret: "dafjdalk",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(configEnv?.mongodbConnectionString);
    console.log("mongoose connected");
}
// Import Routes
app.use(cors());

const courseRoutes = require("./routes/course.route");
const languageRoutes = require("./routes/language.route");
const chapterRoutes = require("./routes/chatper.route");
const quizRoutes = require("./routes/quiz.route");
const userRoutes = require("./routes/user.route");
const paymentRoutes = require("./routes/payment.route");

app.get("/", (req, res) => {
    res.json({ working: "fine" });
});

// Use Routes
// app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/language", languageRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/payments", paymentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
