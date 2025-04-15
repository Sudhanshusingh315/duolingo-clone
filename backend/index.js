require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { configEnv } = require("./constants");

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin.endsWith(".vercel.app")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH"],
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

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
