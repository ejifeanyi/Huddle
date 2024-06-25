require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");

const { PORT } = process.env;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.info(`Server is listening on PORT ${PORT}`);
	});
});
