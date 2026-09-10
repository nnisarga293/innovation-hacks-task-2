const express = require("express");
const router = express.Router();

let tasks = [];

// Create a task
router.post("/", (req, res) => {
    const { title, description, projectId, status } = req.body;

    if (!title || !description || !projectId) {
        return res.status(400).json({
            message: "Title, description and projectId are required"
        });
    }

    const validStatuses = ["todo", "in-progress", "done"];
    const taskStatus = status || "todo";

    if (!validStatuses.includes(taskStatus)) {
        return res.status(400).json({
            message: "Status must be todo, in-progress or done"
        });
    }

    const task = {
        id: tasks.length + 1,
        title,
        description,
        projectId,
        status: taskStatus
    };

    tasks.push(task);

    res.status(201).json(task);
});

// Get all tasks
router.get("/", (req, res) => {
    res.status(200).json(tasks);
});

// Get task by ID
router.get("/:id", (req, res) => {
    const task = tasks.find(
        t => t.id === Number(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// Update a task
router.put("/:id", (req, res) => {
    const task = tasks.find(
        t => t.id === Number(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, description, projectId, status } = req.body;

    if (!title || !description || !projectId || !status) {
        return res.status(400).json({
            message: "Title, description, projectId and status are required"
        });
    }

    const validStatuses = ["todo", "in-progress", "done"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Status must be todo, in-progress or done"
        });
    }

    task.title = title;
    task.description = description;
    task.projectId = projectId;
    task.status = status;

    res.status(200).json(task);
});

// Delete a task
router.delete("/:id", (req, res) => {
    const index = tasks.findIndex(
        t => t.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

module.exports = router;