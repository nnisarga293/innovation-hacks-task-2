const express = require("express");
const router = express.Router();

let users = [];

// Create a user
router.post("/", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email
    };

    users.push(user);

    res.status(201).json(user);
});

// Get all users
router.get("/", (req, res) => {
    res.status(200).json(users);
});

// Get user by ID
router.get("/:id", (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

module.exports = router;