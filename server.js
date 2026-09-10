const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User API
app.use("/api/users", userRoutes);

// Project API
app.use("/api/projects", projectRoutes);

// Task API
app.use("/api/tasks", taskRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Innovation Hacks Task 2 API is running!"
    });
});

// Centralized error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});