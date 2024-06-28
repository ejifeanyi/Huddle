require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");
const { Server } = require("socket.io");

const io = new Server(server);

const { PORT } = process.env;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.info(`Server is listening on PORT ${PORT}`);
	});

	io.on("connection", (socket) => {
		console.log("a user connected");
	});
});
