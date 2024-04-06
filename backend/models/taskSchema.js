const mongoose = require("mongoose");
const User = require("../models/userSchema");

// Define the schema for the Task model
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Task model
const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
