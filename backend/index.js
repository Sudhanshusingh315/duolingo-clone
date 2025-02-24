require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { configEnv } = require("./constants");

const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(configEnv?.mongodbConnectionString);
    console.log("mongoose connected");
}
// Import Routes

const courseRoutes = require("./routes/course.route");
const languageRoutes = require("./routes/language.route");
const chapterRoutes = require("./routes/chatper.route");
// const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quiz.route");

app.get("/", (req, res) => {
    res.json({ working: "fine" });
});

// Use Routes
// app.use("/api/users", userRoutes);
app.use("/api/language", languageRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/quizzes", quizRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
