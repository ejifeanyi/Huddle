const Task = require("../models/task");
const User = require("../models/user");
const Project = require("../models/project");

exports.getAllTasks = async (req, res) => {
	const { projectId } = req.params;

	try {
		const project = await Project.findById(projectId);
		if (!project) return res.status(404).json({ message: "Project not found" });

		const tasks = await Task.find({ project: projectId });
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.addTask = async (req, res) => {
	const { projectId } = req.params;
	const { title, description, assignee } = req.body;

	try {
		const project = await Project.findById(projectId);
		if (!project) return res.status(404).json({ message: "Project not found" });

		const task = new Task({
			title,
			description,
			project: projectId,
			assignee,
		});

		await task.save();
		project.tasks.push(task._id);
		await project.save();

		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.updateTaskColumn = async (req, res) => {
	const { id } = req.params;
	const { column } = req.body;

	try {
		const task = await Task.findById(id);
		if (task) {
			task.column = column;
			const updatedTask = await task.save();
			res.json(updatedTask);
		} else {
			res.status(404).json({ message: "Task not found" });
		}
	} catch (error) {
		res.status(400).json({ message: "Error updating task status", error });
	}
};

exports.assignTask = async (req, res) => {
	const { taskId } = req.params;
	const { userIds } = req.body;

	try {
		const task = await Task.findById(taskId).populate("project");
		if (!task) return res.status(404).json({ message: "Task not found" });

		const project = await Project.findById(task.project._id);
		if (!project) return res.status(404).json({ message: "Project not found" });

		// Check if all users are part of the project
		const users = await User.find({ _id: { $in: userIds } });
		if (users.length !== userIds.length) {
			return res.status(404).json({ message: "One or more users not found" });
		}

		const allUsersInProject = userIds.every((userId) =>
			project.users.includes(userId)
		);
		if (!allUsersInProject) {
			return res
				.status(403)
				.json({ message: "One or more users are not part of the project" });
		}

		task.assignees = userIds;
		await task.save();

		res.json(task);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Error assigning users to task", error });
	}
};

exports.updateTask = async (req, res) => {
	const { id } = req.params;
	const { title, description, assignee, column, priority } = req.body;

	try {
		const task = await Task.findById(id);
		if (!task) return res.status(404).json({ message: "Task not found" });

		task.title = title || task.title;
		task.description = description || task.description;
		task.assignee = assignee || task.assignee;
		task.column = column || task.column;
		task.priority = priority || task.priority;

		await task.save();
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.deleteTask = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findById(id);
		if (!task) return res.status(404).json({ message: "Task not found" });

		await task.remove();
		res.status(200).json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
