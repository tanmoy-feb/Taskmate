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
router.post("/", protect, createTask);           
router.get("/", protect, getTasks);              
router.put("/:id", protect, updateTask);         
router.delete("/:id", protect, deleteTask);      

export default router;
