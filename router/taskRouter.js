const express = require("express");
const router = express.Router();
const Task = require("../models/Task.schema.js");
const User = require("../models/User.schema.js");

// Get all tasks
router.get("/", async (req, res) => {
	try {
		let user;
		try {
			user = await User.findById(req.query.userId);
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
		const tasks = await Task.find().sort({ dueDate: -1 });
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get all tasks with sorting
router.get("/", async (req, res) => {
	try {
		let user;
		try {
			user = await User.findById(req.query.userId);
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
		let sortBy = req.query.sortBy;
		let sortOptions = {};

		if (sortBy === "dueDate") {
			sortOptions.dueDate = -1;
		} else if (sortBy === "category") {
			sortOptions.category = 1;
		} else if (sortBy === "completed") {
			sortOptions.completed = -1;
		}

		const tasks = await Task.find({ createdBy: user._id }).sort(sortOptions);
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Create a new task
router.post("/", async (req, res) => {
	//First check if the user is valid
	try {
		const user = await User.findById(req.body.userId);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	const task = new Task({
		title: req.body.title,
		description: req.body.description,
		dueDate: req.body.dueDate,
		category: req.body.category,
		completed: req.body.completed,
		createdBy: req.body.userId,
		priority: req.body.priority,
	});

	try {
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update task status
router.put("/:id", getTask, async (req, res) => {
	if (req.body.completed != null) {
		res.task.completed = req.body.completed;
	}
	try {
		const updatedTask = await res.task.save();
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

async function getTask(req, res, next) {
	let task;
	try {
		task = await Task.findById(req.params.id);
		if (task == null) {
			return res.status(404).json({ message: "Cannot find task" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.task = task;
	next();
}

module.exports = router;
