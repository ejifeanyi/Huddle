const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const chatController = require("../controllers/chatController");
const { protect, admin } = require("../middleware/auth");
const { check } = require("express-validator");

// Health check endpoint
router.get("/", (req, res) => {
	res.send("Server is up and running.");
});

// Auth routes
router.post("/api/auth", authController.verifyToken);

// User routes
router.post(
	"/api/users/register",
	[
		check("firstname", "Firstname is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password must be at least 6 characters").isLength({
			min: 6,
		}),
	],
	userController.registerUser
);
router.post("/api/users/login", userController.authUser);
router.get("/api/users/profile", protect, (req, res) => {
	res.json(req.user);
});

// Project routes
router.post("/api/projects", protect, projectController.createProject);
router.get("/api/projects", protect, projectController.getAllProjects);
router.post(
	"/api/projects/:projectId/users",
	protect,
	admin,
	userController.addUserToProject
);
router.delete(
	"/api/projects/:projectId/users",
	protect,
	admin,
	userController.removeUserFromProject
);

// Chat routes
router.get(
	"/api/projects/:projectId/chats",
	protect,
	admin,
	chatController.getProjectChats
);
router.post(
	"/api/projects/:projectId/chats",
	protect,
	admin,
	chatController.sendChat
);

// Task routes
router.get(
	"/api/projects/:projectId/tasks",
	protect,
	taskController.getAllTasks
);
router.post("/api/projects/:projectId/tasks", protect, taskController.addTask);
router.put("/api/tasks/:taskId", protect, admin, taskController.updateTask);
router.delete("/api/tasks/:taskId", protect, admin, taskController.deleteTask);

// to update column of task
router.put(
	"/api/tasks/:taskId/column",
	protect,
	admin,
	taskController.updateTaskColumn
);

// to assign user to a task from the project
router.put(
	"/api/tasks/:taskId/assign",
	protect,
	admin,
	taskController.assignTask
);

module.exports = router;
