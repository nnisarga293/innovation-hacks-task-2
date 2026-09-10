const express = require("express");
const router = express.Router();

let projects = [];

// Create a project
router.post("/", (req, res) => {
    const { name, description, userId } = req.body;

    if (!name || !description || !userId) {
        return res.status(400).json({
            message: "Name, description and userId are required"
        });
    }

    const project = {
        id: projects.length + 1,
        name,
        description,
        userId
    };

    projects.push(project);

    res.status(201).json(project);
});

// Get all projects
router.get("/", (req, res) => {
    res.status(200).json(projects);
});

// Get project by ID
router.get("/:id", (req, res) => {
    const project = projects.find(
        p => p.id === Number(req.params.id)
    );

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    res.status(200).json(project);
});

module.exports = router;