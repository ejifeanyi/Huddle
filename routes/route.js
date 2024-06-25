const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Health check endpoint
router.get("/", (req, res) => {
	res.send("Server is up and running.");
});

// Task routes
router.get("/api/tasks", taskController.getAllTasks);
router.post("/api/tasks", taskController.addTask);
router.get("/api/tasks/:id", taskController.getOneTask);
router.put("/api/tasks/:id", taskController.updateTask);
router.delete("/api/tasks/:id", taskController.deleteTask);

module.exports = router;
