const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	users: { type: Array, default: [] },
	image: { type: String, default: "" },
	content: { type: String, required: true },
	status: { type: String, default: "pending" },
	tags: { type: Array, default: [] },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
