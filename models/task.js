const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		assignee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		status: {
			type: String,
			enum: [
				"pending",
				"brainstorm",
				"in-design",
				"in-development",
				"in-testing",
				"in-review",
				"in-shipping",
				"completed",
			],
			default: "pending",
		},
		tags: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
