const Chat = require("../models/chat");

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
exports.getProjectChats = async (req, res) => {
	const { projectId } = req.params;

	try {
		const messages = await Message.find({ projectId }).populate(
			"sender",
			"firstname email"
		);
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
