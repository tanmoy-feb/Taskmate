import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected by auth middleware
router.post("/", protect, createTask);           // Create Task
router.get("/", protect, getTasks);              // Get All Tasks
router.put("/:id", protect, updateTask);         // Update Task
router.delete("/:id", protect, deleteTask);      // Delete Task

export default router;
