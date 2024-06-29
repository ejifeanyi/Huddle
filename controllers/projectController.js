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