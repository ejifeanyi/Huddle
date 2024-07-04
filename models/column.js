const mongoose = require("mongoose");

const columnSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
