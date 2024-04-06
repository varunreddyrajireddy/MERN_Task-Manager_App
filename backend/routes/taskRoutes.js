const express = require("express");
const router = express.Router();
const {
  allTasks,
  addTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, allTasks);
router.route("/add").post(protect, addTask);
router.route("/:taskId").delete(protect, deleteTask);

module.exports = router;
