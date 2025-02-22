require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const configEnv = require("./constants");
console.log("configenv", configEnv);

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
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoutes = require("./routes/quizRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
