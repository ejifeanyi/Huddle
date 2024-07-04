const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: String,
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		assignees: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		chats: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				message: String,
				timestamp: { type: Date, default: Date.now },
			},
		],
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
