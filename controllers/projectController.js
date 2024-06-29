const Project = require("../models/project");

exports.createProject = async (req, res) => {
	const { name } = req.body;

	try {
		const project = new Project({
			name,
			admin: req.user._id,
			users: [req.user._id],
		});

		await project.save();
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.getAllProjects = async (req, res) => {
	try {
		const projects = await Project.find({ users: req.user._id });
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.addUserToProject = async (req, res) => {
	const { email } = req.body;
	const { projectId } = req.params;

	try {
		const project = await Project.findById(projectId);
		if (!project) return res.status(404).json({ message: "Project not found" });

		if (project.admin.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: "User not found" });

		if (!project.users.includes(user._id)) {
			project.users.push(user._id);
			await project.save();
		}

		res.status(200).json(project);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Remove user from project
exports.removeUserFromProject = async (req, res) => {
	const { userId } = req.body;
	const { projectId } = req.params;

	try {
		const project = await Project.findById(projectId);
		if (!project) return res.status(404).json({ message: "Project not found" })
		
		if (project.admin.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized" });
		}

		project.users = project.users.filter(user => user.toString() !== userId)
		await project.save();

		res.status(200).json(project)
	} catch (error) {
		res.status(500).json({message: "Server error"})
	}
}

// Send message in project
exports.sendChat = async (projectId, userId, content) => {
	const chat = new Chat({
		projectId,
		sender: userId,
		content,
	});
	await chat.save();
	return chat;
};

// Get project messages
exports.getProjectMessages = async (req, res) => {
	const { projectId } = req.params;

	try {
		const messages = await Message.find({ projectId }).populate("sender", "firstname email");
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}