const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Routes
const taskRouter = require("./router/taskRouter.js");
const userRouter = require("./router/userRouter.js");   

//App config
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting up the routes
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

//DB config
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_STRING);
		console.log("MongoDB connected");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};


//Listener
connectDB().then(() => {
	app.listen(3000, () => {
		console.log(`Server is running on port ${3000}`);
	});
});