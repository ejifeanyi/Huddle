const Task = require("../models/task");

exports.getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: "Error fetching tasks", error });
	}
};

exports.addTask = async (req, res) => {
	try {
		const task = new Task({
			title: req.body.title,
			description: req.body.description,
			users: req.body.users || [],
			image: req.body.image || "",
			content: req.body.content,
			status: req.body.status || "pending",
			tags: req.body.tags || [],
		});
		const savedTask = await task.save();
		res.status(201).json(savedTask);
	} catch (error) {
		res.status(500).json({ message: "Error adding task", error });
	}
};

exports.getOneTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: "Error fetching task", error });
	}
};

exports.updateTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });

		task.title = req.body.title || task.title;
		task.description = req.body.description || task.description;
		task.users = req.body.users || task.users;
		task.image = req.body.image || task.image;
		task.content = req.body.content || task.content;
		task.status = req.body.status || task.status;
		task.tags = req.body.tags || task.tags;
		task.updatedAt = new Date();

		const updatedTask = await task.save();
		res.status(200).json(updatedTask);
	} catch (error) {
		res.status(500).json({ message: "Error updating task", error });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		res.status(200).json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting task", error });
	}
};
