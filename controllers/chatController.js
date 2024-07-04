const Chat = require("../models/chat");

exports.sendChat = async (req, res) => {
	const { projectId } = req.params;
	const { content } = req.body;

	try {
		const chat = new Chat({
			projectId,
			sender: req.user._id,
			content,
		});

		await chat.save();
		res.status(201).json(chat);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.getProjectChats = async (req, res) => {
	const { projectId } = req.params;

	try {
		const chats = await Chat.find({ projectId }).populate(
			"sender",
			"firstname email"
		);
		res.status(200).json(chats);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
