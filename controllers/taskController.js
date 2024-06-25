const Task = require("../models/task");
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

		if (!project.users.includes(req.user._id)) {
			return res.status(403).json({ message: "Not authorized" });
		}

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

exports.updateTask = async (req, res) => {
	const { taskId } = req.params;
	const { title, description, assignee, status, tags } = req.body;

	try {
		const task = await Task.findById(taskId);
		if (!task) return res.status(404).json({ message: "Task not found" });

		const project = await Project.findById(task.project);
		if (!project) return res.status(404).json({ message: "Project not found" });

		if (project.admin.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized" });
		}

		task.title = title || task.title;
		task.description = description || task.description;
		task.assignee = assignee || task.assignee;
		task.status = status || task.status;
		task.tags = tags || task.tags;
		task.updatedAt = new Date();

		await task.save();
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.deleteTask = async (req, res) => {
	const { taskId } = req.params;

	try {
		const task = await Task.findById(taskId);
		if (!task) return res.status(404).json({ message: "Task not found" });

		const project = await Project.findById(task.project);
		if (!project) return res.status(404).json({ message: "Project not found" });

		if (project.admin.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized" });
		}

		await task.remove();
		project.tasks.pull(task._id);
		await project.save();

		res.status(200).json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
