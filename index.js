require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/database");
const { Server } = require("socket.io");

const { PORT } = process.env;

// Create the server from the app instance
const server = http.createServer(app);

// Create socket.io instance
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

connectDB().then(() => {
	server.listen(PORT, () => {
		console.info(`Server is listening on PORT ${PORT}`);
	});

	io.on("connection", (socket) => {
		console.log("a user connected");
	});
});
