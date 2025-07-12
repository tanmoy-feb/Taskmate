import axiosInstance from "./axiosInstance";

export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/tasks", taskData);
  return res.data;
};

export const updateTask = async (taskId, taskData) => {
  const res = await axiosInstance.put(`/tasks/${taskId}`, taskData);
  return res.data;
};

export const deleteTask = async (taskId) => {
  const res = await axiosInstance.delete(`/tasks/${taskId}`);
  return res.data;
};
