const Project = require("../models/project");

exports.createProject = async (req, res) => {
	const { name, description } = req.body;

	try {
		const project = new Project({
			name,
			description,
			admin: req.user._id,
			assignees: [req.user._id],
		});

		await project.save();
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.addChatToProject = async (req, res) => {
	const { projectId } = req.params;
	const { message } = req.body;

	try {
		const project = await Project.findById(projectId);
		if (project) {
			const chat = {
				user: req.user._id,
				message,
			};
			project.chats.push(chat);
			const updatedProject = await project.save();
			res.json(updatedProject);
		} else {
			res.status(404).json({ message: "Project not found" });
		}
	} catch (error) {
		res.status(400).json({ message: "Error adding chat to project", error });
	}
};

exports.getAllProjects = async (req, res) => {
	try {
		const projects = await Project.find({ assignees: req.user._id });
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
