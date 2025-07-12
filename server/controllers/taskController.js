import Task from "../models/Task.js";

//  Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      status: status.toLowerCase(), // normalize
      dueDate: dueDate ? new Date(dueDate) : null,
      user: req.user._id,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

//  Get Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

//  Update Task
export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

//  Delete Task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
