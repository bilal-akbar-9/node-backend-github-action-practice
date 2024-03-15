const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
        },
        discription: {
            type: String,
            required: true,
        },
		completed: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		priority: {
			type: String,
			required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
