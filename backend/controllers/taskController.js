const asyncHandler = require("express-async-handler");
const Task = require("../models/taskSchema");

const allTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const allTasks = await Task.find({ user: userId });

    if (allTasks.length > 0) {
      res.status(200).json(allTasks);
    } else {
      res.status(404).json({ message: "No tasks found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const { title } = req.body;

    const task = new Task({
      user: userId,
      title,
    });

    await task.save();

    // Send a success response
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: `No task found with ${taskId}` });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = { allTasks, addTask, deleteTask };
